"use server";

import { get } from "@/app/common/util/fetch";
import { PricingImages } from "../interfaces/pricing-images.interface";

export default async function getPricingImages(id: number) {
  const images = (await get(`retailers/${id}/images`, [
    "retailers",
  ])) as PricingImages;
  return images;
}
