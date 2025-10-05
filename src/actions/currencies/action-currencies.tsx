"use client";
import axiosCustom from "@/app/api/axios";

export async function createCurrency(
    currency: string,
    acronym: string,
    currencies: { type: string; conversion: string }[]
): Promise<{
    result: string;
    code: number;
}> {
    const formData = new FormData();

    formData.append("nameCurrency", currency);
    formData.append("acronymCurrency", acronym);
    formData.append("currencies", JSON.stringify(currencies));

    return await axiosCustom
        .post("http://localhost:3000/api/currencies/add", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result.data };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data.data };
        });

}


export async function getCurrencies(): Promise<{
    ok: boolean;
    result: { name: string; email: string };
    code: number;
}> {

    return await axiosCustom
        .get("http://localhost:3000/api/currencies")
        .then((response) => {
            const result = response.data;
            return { ok: result.ok, code: result.code, result: result.result.data };
        })
        .catch((error) => {
            return { ok: false, code: 500, result: error.response.data.data };
        });

}

