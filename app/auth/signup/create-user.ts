"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { redirect } from "next/navigation";

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

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: filteredFormData,
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  redirect("/");
}
