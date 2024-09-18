"use server";

import { get } from "@/app/common/util/fetch";
import { Pricings } from "../interfaces/pricing.interface";

export default async function getPricings() {
  return get<Pricings[]>("pricings", ["pricings"]);
}
