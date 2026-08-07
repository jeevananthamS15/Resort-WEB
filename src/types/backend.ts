// Mirrors AN-RSM-Backend's actual customer-facing response shapes,
// confirmed live via curl against the real DB — not guessed.

export interface PublicCustomer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isVerified: boolean;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  customer: PublicCustomer;
}

export type OtpChannel = "otp_sms" | "otp_email" | "otp_whatsapp";

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export type RoomStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "OCCUPIED"
  | "CLEANING"
  | "MAINTENANCE"
  | "BLOCKED";

export interface RoomImage {
  id: string;
  tenantId: string;
  roomId: string;
  s3Key: string;
  sortOrder: number;
  createdAt: string;
}

export interface Amenity {
  id: string;
  tenantId: string;
  name: string;
  createdAt: string;
}

export interface PublicRoom {
  id: string;
  tenantId: string;
  roomNumber: string;
  name: string;
  type: string;
  capacityAdults: number;
  capacityChildren: number;
  basePrice: string;
  pricingRules: { weekend?: number; holiday?: number };
  status: RoomStatus;
  description: string | null;
  images: RoomImage[];
}

export interface PublicRoomDetail extends PublicRoom {
  amenities: Amenity[];
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export type BookingSource = "WEBSITE" | "WALK_IN" | "PHONE" | "TRAVEL_AGENT" | "OTA";
export type BookingStatus = "RESERVED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED" | "NO_SHOW";
export type BookingPaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "REFUNDED";

export interface Booking {
  id: string;
  tenantId: string;
  customerId: string;
  bookingNumber: string;
  source: BookingSource;
  status: BookingStatus;
  paymentStatus: BookingPaymentStatus;
  totalAmount: string;
  idProofS3Key: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRoom {
  id: string;
  tenantId: string;
  bookingId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  rateSnapshot: string;
  guestCount: number;
  isActiveHold: boolean;
  createdAt: string;
}

export interface BookingWithRooms extends Booking {
  rooms: BookingRoom[];
}

export interface Invoice {
  id: string;
  tenantId: string;
  bookingId: string;
  invoiceNumber: string;
  totalAmount: string;
  s3Key: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export type CustomerPaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "NET_BANKING";
export type PaymentDirection = "CHARGE" | "REFUND";
export type PaymentStatus = "PENDING" | "PENDING_VERIFICATION" | "SUCCESS" | "FAILED";

export interface Payment {
  id: string;
  tenantId: string;
  bookingId: string;
  customerId: string;
  method: CustomerPaymentMethod | "CASH" | "UPI";
  direction: PaymentDirection;
  amount: string;
  status: PaymentStatus;
  gatewayProvider?: string;
  gatewayRef?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Public tenant / branding info
// ---------------------------------------------------------------------------

export interface TenantInfo {
  tenant: { name: string; currency: string; timezone: string };
  general: {
    checkInTime: string;
    checkOutTime: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
  };
  branding: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  policies: {
    cancellationPolicy: string;
    cancellationWindowHours: number;
  };
}
