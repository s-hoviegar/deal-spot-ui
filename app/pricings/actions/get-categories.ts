"use server";

import { get } from "@/app/common/util/fetch";
import { Category } from "../interfaces/category.interface";

export default async function getCategories() {
  return get<Category[]>("categories", ["categories"]);
}
