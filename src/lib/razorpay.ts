"use client";

import type { RazorpayCheckoutConfig } from "@/types/backend";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open(): void };
  }
}

interface RazorpayOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  prefill?: { name?: string; email?: string };
  theme?: { color?: string };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: { ondismiss?: () => void };
}

let scriptPromise: Promise<void> | null = null;

/** Razorpay's Checkout.js is only ever needed on the checkout/retry-payment
 * screens, so it's loaded on demand here rather than in the root layout —
 * cached in a module-level promise so a second payment attempt on the same
 * page load doesn't re-fetch the script. */
function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Razorpay checkout script"));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Opens Razorpay's Checkout.js modal for a real order the backend already
 * created. Resolves with "success" once Razorpay's own handler fires —
 * that only means the customer completed the card/UPI flow, not that the
 * booking's payment is confirmed: confirmation is the webhook flipping the
 * payment to SUCCESS server-side (payment.service.ts's handleWebhook), so
 * callers should still treat the booking as PENDING immediately after this
 * resolves and rely on a refresh to pick up the confirmed status.
 */
export async function openRazorpayCheckout(
  config: RazorpayCheckoutConfig,
  meta: { resortName: string; customerName?: string; customerEmail?: string },
): Promise<"success" | "dismissed"> {
  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error("Razorpay checkout script did not load");
  }

  return new Promise((resolve) => {
    const instance = new window.Razorpay!({
      key: config.keyId,
      order_id: config.orderId,
      amount: config.amountPaise,
      currency: config.currency,
      name: meta.resortName,
      description: "Booking payment",
      prefill: { name: meta.customerName, email: meta.customerEmail },
      handler: () => resolve("success"),
      modal: { ondismiss: () => resolve("dismissed") },
    });
    instance.open();
  });
}
