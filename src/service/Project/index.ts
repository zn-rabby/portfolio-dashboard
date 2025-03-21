"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
            next: {
                tags: ["PROJECT"]
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getProjectById = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            // cache: "no-store",
            next: {
                tags: ["PROJECT"]
            }
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const addProject = async (projectData: any,) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(projectData),
        })
        revalidateTag("PROJECT");

        const data = await res.json()
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateProjectById = async (id: string, updatedProjectData: any) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(updatedProjectData)
        })
        revalidateTag("PROJECT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}


export const deleteProjectById = async (id: string) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": (await cookies()).get("accessToken")!.value,
            },
        })
        revalidateTag("PROJECT");
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}