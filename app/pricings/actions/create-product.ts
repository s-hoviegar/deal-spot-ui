"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { post } from "../../common/util/fetch";

export default async function createProduct(formData: FormData) {
  const res = await post("products", formData);
  revalidateTag("products");
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  const id = parsedRes.product_id;
  return { product_id: id, error: "" };
}
