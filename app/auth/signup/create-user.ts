"use server";

import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";
import { getErrorMessage } from "../../common/util/errors";

export default async function createUser(_prevState: any, formData: FormData) {
  const filteredFormData = new FormData();

  // List of fields you want to include in the form data
  const allowedFields = ["name", "email", "password_hash", "last_login"];

  // Convert formData entries to an array and then iterate
  Array.from(formData.entries()).forEach(([key, value]) => {
    if (allowedFields.includes(key)) {
      filteredFormData.append(key, value);
    }
  });

  const res = await post("users", filteredFormData);
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  redirect("/");
}
