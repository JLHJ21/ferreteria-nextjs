"use client";
import axiosCustom from "@/app/api/axios";

export async function createClient(
    client: string,
    id: string

): Promise<{
    result: string;
    code: number;
}> {
    const formData = new FormData();

    formData.append("client", client);
    formData.append("id", id);

    return await axiosCustom
        .post("http://localhost:3000/api/clients/add", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data };
        });
}

