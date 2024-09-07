"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { getHeaders } from "../../common/util/fetch";
import { API_URL } from "@/app/common/constants/api";

export default async function uploadShopImage(
  formData: FormData,
  shopId: number
) {
  const file = formData.get("images");
  console.log(file);
  const newFormData = new FormData();
  newFormData.append("images", file);
  const res = await fetch(`${API_URL}/retailers/${shopId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
  return res;
  // if (!res.ok) {
  //   return { error: getErrorMessage(parsedRes) };
  // }
  // return { error: "" };
}
