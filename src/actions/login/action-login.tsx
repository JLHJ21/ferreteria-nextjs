"use client";
import axiosCustom from "@/app/api/axios";

export async function sendLogin(
  email: string,
  password: string
): Promise<{ ok: boolean; result: string; code: number }> {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  return await axiosCustom
    .post("http://localhost:3000/api/login", formData)
    .then((response) => {
      const result = response.data;
      return { ok: result.ok, code: result.code, result: result.result.data };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, code: 500, result: error.response.data.data };
    });
}

export async function recoverPassword(
  email: string
): Promise<{ ok: boolean; result: string; code: number }> {
  const formData = new FormData();

  formData.append("email", email);

  return await axiosCustom
    .post("http://localhost:3000/api/login/recover", formData)
    .then((response) => {
      const result = response.data;
      return { ok: result.ok, code: result.code, result: result.result.data };
    })
    .catch((error) => {
      return { ok: false, code: 500, result: error.response.data.data };
    });
}

export async function confirmCode(
  code: string,
  email: string
): Promise<{
  ok: boolean;
  result: { pass: boolean; message: string };
  code: number;
}> {
  const formData = new FormData();

  formData.append("code", code);
  formData.append("email", email);

  return await axiosCustom
    .post("http://localhost:3000/api/login/confirm", formData)
    .then((response) => {
      const result = response.data;
      return { ok: result.ok, code: result.code, result: result.result.data };
    })
    .catch((error) => {
      return { ok: false, code: 500, result: error.response.data.data };
    });
}

export async function changePassword(
  email: string,
  password: string,
  repeat: string
): Promise<{ ok: boolean; result: string; code: number }> {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);
  formData.append("repeat", repeat);

  return await axiosCustom
    .post("http://localhost:3000/api/login/change", formData)
    .then((response) => {
      const result = response.data;
      return { ok: result.ok, code: result.code, result: result.result.data };
    })
    .catch((error) => {
      return { ok: false, code: 500, result: error.response.data.data };
    });
}
