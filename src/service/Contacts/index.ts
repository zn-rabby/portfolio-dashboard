/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllContacts = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contacts?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["CONTACTS"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteContactById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CONTACTS");
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
