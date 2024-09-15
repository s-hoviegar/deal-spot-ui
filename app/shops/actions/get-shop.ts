import { get } from "@/app/common/util/fetch";
import { Shop, ShopError } from "../interfaces/shop.interface";

export default async function getShop(shopId: number) {
  return get<Shop | ShopError>(`retailers/${shopId}`);
}
