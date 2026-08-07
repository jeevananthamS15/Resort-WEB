// Mirrors the backend's room.service.ts / pricing.ts resolution exactly
// (holiday > weekend > base) — client-side only for an instant price
// preview before booking; the backend recomputes and snapshots the real
// rate at booking-create time regardless, so this can never be the source
// of truth, only a preview.

export function isWeekend(dateStr: string): boolean {
  const day = new Date(dateStr).getUTCDay();
  return day === 5 || day === 6; // Friday, Saturday
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function resolveEffectivePrice(
  basePrice: string,
  pricingRules: { weekend?: number; holiday?: number },
  checkInDate: string,
): number {
  if (isWeekend(checkInDate) && typeof pricingRules.weekend === "number") {
    return pricingRules.weekend;
  }
  return Number(basePrice);
}

export function estimateTotal(
  basePrice: string,
  pricingRules: { weekend?: number; holiday?: number },
  checkInDate: string,
  checkOutDate: string,
): { nights: number; perNight: number; total: number } {
  const nights = nightsBetween(checkInDate, checkOutDate);
  const perNight = resolveEffectivePrice(basePrice, pricingRules, checkInDate);
  return { nights, perNight, total: perNight * nights };
}
