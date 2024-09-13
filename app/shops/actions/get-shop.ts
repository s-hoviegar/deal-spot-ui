import { get } from "@/app/common/util/fetch";
import { Shop } from "../interfaces/shop.interface";

export default async function getShop(shopId: number) {
  return get<Shop>(`retailers/${shopId}`);
}
