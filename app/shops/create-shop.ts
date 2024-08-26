"use server";

import { getErrorMessage } from "../common/util/errors";
import { post } from "../common/util/fetch";

export default async function createShop(formData: FormData) {
  const res = await post("retailers", formData);
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
}
