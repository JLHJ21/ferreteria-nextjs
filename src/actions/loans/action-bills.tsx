"use client";
import axiosCustom from "@/app/api/axios";


export async function createLoan(
    client: string,
    money: string,
    currency: string
): Promise<{
    result: string;
    code: number;
}> {
    const formData = new FormData();

    formData.append("client", client);
    formData.append("money", money);
    formData.append("currency", currency);

    return await axiosCustom
        .post("http://localhost:3000/api/loans/add", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data };
        });
}

