"use client";
import axiosCustom from "@/app/api/axios";

export async function createSupplier(
    supplier: string,
    rif: string,
    address: string

): Promise<{
    result: string;
    code: number;
}> {
    const formData = new FormData();

    formData.append("supplier", supplier);
    formData.append("rif", rif);
    formData.append("address", address);

    return await axiosCustom
        .post("http://localhost:3000/api/suppliers/add", formData)
        .then((response) => {
            const result = response.data;
            return { code: result.code, result: result.result };
        })
        .catch((error) => {
            return { code: 500, result: error.response.data };
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

