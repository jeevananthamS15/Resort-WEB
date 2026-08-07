"use server";

import { backendFetch, BackendError } from "@/lib/backend";
import type {
  Booking,
  BookingWithRooms,
  CustomerPaymentMethod,
  Invoice,
  Payment,
} from "@/types/backend";

export type CreateAndPayState = {
  error?: string;
  success?: { bookingId: string; redirectUrl?: string };
};

/** Full payment only, collected immediately after booking creation — no
 * "pay at property" option, per product decision. If payment fails after
 * the booking is created, the booking still exists (RESERVED, PENDING) —
 * the account page lets the customer retry payment on it later, it is
 * never silently lost. */
export async function createAndPayAction(input: {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  paymentMethod: CustomerPaymentMethod;
}): Promise<CreateAndPayState> {
  let bookingId: string;
  let totalAmount: string;

  try {
    const { booking } = await backendFetch<{ booking: Booking }>("/customer/bookings", {
      method: "POST",
      body: {
        rooms: [
          {
            roomId: input.roomId,
            checkInDate: input.checkInDate,
            checkOutDate: input.checkOutDate,
            guestCount: input.guestCount,
          },
        ],
      },
    });
    bookingId = booking.id;
    totalAmount = booking.totalAmount;
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }

  try {
    const paymentResult = await backendFetch<{ payment: Payment; redirectUrl?: string }>(
      `/customer/bookings/${bookingId}/payments`,
      { method: "POST", body: { method: input.paymentMethod, amount: totalAmount } },
    );
    return { success: { bookingId, redirectUrl: paymentResult.redirectUrl } };
  } catch (err) {
    // Booking already exists at this point — surface the payment error
    // but still point at the booking so the customer can retry payment
    // from their account rather than losing track of it.
    if (err instanceof BackendError) {
      return { error: `Booking created, but payment failed: ${err.message}`, success: { bookingId } };
    }
    throw err;
  }
}

export async function payForBookingAction(
  bookingId: string,
  method: CustomerPaymentMethod,
  amount: string,
): Promise<{ error?: string; redirectUrl?: string }> {
  try {
    const result = await backendFetch<{ payment: Payment; redirectUrl?: string }>(
      `/customer/bookings/${bookingId}/payments`,
      { method: "POST", body: { method, amount } },
    );
    return { redirectUrl: result.redirectUrl };
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
}

export async function cancelMyBookingAction(
  bookingId: string,
): Promise<{ error?: string }> {
  try {
    await backendFetch<{ booking: Booking }>(`/customer/bookings/${bookingId}/cancel`, {
      method: "POST",
    });
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
  return {};
}

export async function getMyBookingAction(
  bookingId: string,
): Promise<BookingWithRooms> {
  const { booking } = await backendFetch<{ booking: BookingWithRooms }>(
    `/customer/bookings/${bookingId}`,
  );
  return booking;
}

export async function getMyInvoiceAction(
  bookingId: string,
): Promise<{ invoice?: Invoice; downloadUrl?: string; error?: string }> {
  try {
    const result = await backendFetch<{ invoice: Invoice; downloadUrl: string }>(
      `/customer/bookings/${bookingId}/invoice`,
    );
    return result;
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
}
