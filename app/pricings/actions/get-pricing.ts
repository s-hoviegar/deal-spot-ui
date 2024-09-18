import { get } from "@/app/common/util/fetch";
import { Pricing, PricingError } from "../interfaces/pricing.interface";

export default async function getPricing(pricingId: number) {
  return get<Pricing | PricingError>(`retailers/${pricingId}`);
}
