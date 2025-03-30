/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllSkills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
      next: {
        tags: ["SKILL"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSkillById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
      // cache: "no-store",
      next: {
        tags: ["SKILL"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addSkill = async (skillData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(skillData),
    });
    revalidateTag("SKILL");

    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateSkillById = async (id: string, updatedSkillData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(updatedSkillData),
    });
    revalidateTag("SKILL");
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteSkillById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("SKILL");
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
