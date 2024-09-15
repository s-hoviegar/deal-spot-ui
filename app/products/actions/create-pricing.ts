"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { post } from "../../common/util/fetch";

export default async function createPricing(formData: FormData) {
  const res = await post("retailers", formData);
  revalidateTag("retailers");
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  const id = parsedRes.retailer_id;
  return { retailer_id: id, error: "" };
}
