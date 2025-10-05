"use client";
import axiosCustom from "@/app/api/axios";

export async function getDateResults(
    begin: string,
    end: string
): Promise<{
    result: string | { month: string, money: string }[];
    code: number;
}> {
    const formData = new FormData();

    formData.append("begin", begin);
    formData.append("end", end);

    return await axiosCustom
        .post("http://localhost:3000/api/bills/date", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data };
        });
}

export async function createBill(
    reason: string,
    money: string,
    id: string
): Promise<{
    result: string;
    code: number;
}> {
    const formData = new FormData();

    formData.append("reason", reason);
    formData.append("money", money);
    formData.append("id", id);

    return await axiosCustom
        .post("http://localhost:3000/api/bills/add", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data };
        });
}

