"use server";

import { get } from "@/app/common/util/fetch";
import { ShopImages } from "../interfaces/shop-images.interface";

export default async function getShopImages(id: number) {
  const images = await get<ShopImages[]>(`retailers/${id}/images`, [
    "retailers",
  ]);
  if (images.length === 0) {
    return null;
  }
  return images;
}
