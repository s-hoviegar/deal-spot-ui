"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { getHeaders } from "../../common/util/fetch";
import { API_URL } from "@/app/common/constants/api";

export default async function uploadProductImage(
  formData: FormData,
  productId: number
) {
  // console.log("FORMDATA*:");
  // console.log(formData);
  // const files: any = formData.getAll("images");
  // console.log("FILE*:");
  // console.log(files);
  const newFormData = new FormData();
  formData.forEach((file) => {
    newFormData.append("images", file);
  });
  console.log(newFormData);
  const res = await fetch(`${API_URL}/products/${productId}/image`, {
    body: newFormData,
    method: "POST",
    headers: getHeaders(),
  });
  // console.log("reeeeeesssssssuuuuuuulllttttt:::::", res);
  const parsedRes = await res.json();
  console.log("json res:", parsedRes);
  if (!res.ok) {
    revalidateTag("products");
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
}
