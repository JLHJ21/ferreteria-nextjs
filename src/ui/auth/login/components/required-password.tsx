import React, { useContext } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import LoginContext from "./login-context";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/utils/validations-regex";
import { changePassword } from "@/actions/login/action-login";
import Input from "@/components/inputs/input";

type InputsSubmit = {
  passwordRecoverInput: string;
  repeatRecoverInput: string;
};

const RequiredPassword = () => {
  const { emailUser, setTypeModal } = useContext(LoginContext);
  const { callsModal } = ErrorsProcess();

  const { patternText } = validation();
  const patternInputPassword = { pattern: patternText(), min: 1, max: 255 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSubmit>();

  const onSubmitPassword: SubmitHandler<InputsSubmit> = async (data) => {
    const result = await changePassword(
      emailUser,
      data.passwordRecoverInput,
      data.repeatRecoverInput
    );
    if (result.ok === true) {
      setTypeModal("success");
    } else {
      callsModal({ error: result.code, message: result.result });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitPassword)}
      className="w-[24.5rem] text-black rounded-[0.25rem] bg-white"
    >
      <div className="grid gap-6">
        <>
          {/* password input */}
          <Input
            classContainer={"flex flex-col grap gap-2"}
            labelTitle={"Password"}
            id={"passwordRecoverInput"}
            inputType={"password"}
            inputPlaceholder={"Enter password"}
            inputPattern={patternInputPassword}
            labelError={"The field password is required"}
            spanInput={false}
            register={register}
            errors={errors}
          />

          {/* Repeat password input */}
          <Input
            classContainer={"flex flex-col grap gap-2"}
            labelTitle={"Repeat your password"}
            id={"repeatRecoverInput"}
            inputType={"password"}
            inputPlaceholder={"Enter password"}
            inputPattern={patternInputPassword}
            labelError={"The field repeat password is required"}
            spanInput={false}
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            className="h-[2.75rem] rounded p-3 grid gap-[0.625rem] bg-black hover:bg-slate-900 hover:border-white justify-center"
            data-button="submitRequiredPassword"
          >
            <span className="text-white font-medium text-base leading-5 h-5 w-auto truncate">
              Send
            </span>
          </button>
        </>
      </div>
    </form>
  );
};

export default RequiredPassword;
