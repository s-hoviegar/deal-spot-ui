"use server";

import { get } from "@/app/common/util/fetch";
import { Shop } from "../interfaces/shop.interface";

export default async function getShops() {
  return get<Shop[]>("retailers", ["retailers"]);
}
