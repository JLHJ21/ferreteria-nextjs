"use client";
import axiosCustom from "@/app/api/axios";

export async function sendRegister(
    username: string,
    name: string,
    email: string,
    password: string,
    repeat: string
): Promise<{
    ok: boolean;
    result: { name: string; email: string };
    code: number;
}> {
    if (password === repeat) {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("repeat", repeat);

        return await axiosCustom
            .post("http://localhost:3000/api/register", formData)
            .then((response) => {
                const result = response.data;
                return { ok: result.ok, code: result.code, result: result.result.data };
            })
            .catch((error) => {
                return { ok: false, code: 500, result: error.response.data.data };
            });
    }

    return {
        ok: false,
        code: 406,
        result: { name: "", email: "The passwords are not the same" },
    };
}

export async function sendCode(
    firstName: string,
    email: string
): Promise<{ ok: boolean; result: string; code: number }> {
    const formData = new FormData();

    formData.append("first", firstName);
    formData.append("email", email);

    return await axiosCustom
        .post("http://localhost:3000/api/register/resend", formData)
        .then((response) => {
            const result = response.data;
            return { ok: result.ok, code: result.code, result: result.result.data };
        })
        .catch((error) => {
            return { ok: false, code: 500, result: error.response.data.data };
        });
}
