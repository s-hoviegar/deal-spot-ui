import { get } from "@/app/common/util/fetch";
import { Price, PricingError } from "../interfaces/pricing.interface";

export default async function getPricing(pricingId: number) {
  return get<Price | PricingError>(`pricings/${pricingId}`);
}
