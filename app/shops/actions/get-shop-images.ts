"use server";

import { get } from "@/app/common/util/fetch";
import { NoShopImage, ShopImages } from "../interfaces/shop-images.interface";

export default async function getShopImages(id: number) {
  const images = (await get(`retailers/${id}/images`, [
    "retailers",
  ])) as ShopImages;
  return images;
}
