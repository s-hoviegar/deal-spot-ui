import { cookies } from "next/headers";
import { API_URL } from "../constants/api";

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  return res;
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });
  return res.json();
};
