import ErrorsProcess from "@/ui/errors-handling/errors-process";
import type React from "react";
import { useContext } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import LoginContext from "./login-context";
import validation from "@/components/validations-regex";
import { confirmCode } from "@/actions/login/action-login";
import InputDisabled from "@/components/inputs/input-disabled";
import Input from "@/components/inputs/input";

type InputsSubmit = {
  codeInput: string;
};

type propsCode = {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CodeEmail = (props: propsCode) => {
  const { callsModal } = ErrorsProcess();
  const { emailUser } = useContext(LoginContext);

  const { patternText } = validation();
  const patternInputEmail = { pattern: patternText(), min: 1, max: 255 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSubmit>();

  const onSubmitCode: SubmitHandler<InputsSubmit> = async (data) => {
    const result = await confirmCode(data.codeInput, emailUser);
    if (result.ok === true) {
      if (result.result.pass) {
        props.setChange(true);
        alert("The code is correct, now you can change your password");
      } else {
        alert("The code is incorrect, try again");
      }
    } else {
      callsModal({ error: result.code, message: result.result.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitCode)}
      data-testid="formCodeEmail"
      className="w-[24.5rem] text-black rounded-[0.25rem] bg-white"
    >
      <div className="grid gap-6">
        {props.change ? (
          <>
            <InputDisabled
              classContainer={"flex flex-col grap gap-2"}
              labelTitle={"Code"}
              id={"codeInput"}
              inputType={"text"}
              inputPlaceholder={""}
              inputPattern={patternInputEmail}
              labelError={"The field code is required"}
              spanInput={false}
              register={register}
              errors={errors}
            />
          </>
        ) : (
          <>
            <Input
              classContainer={"flex flex-col grap gap-2"}
              labelTitle={"Code"}
              id={"codeInput"}
              inputType={"text"}
              inputPlaceholder={""}
              inputPattern={patternInputEmail}
              labelError={"The field code is required"}
              spanInput={false}
              register={register}
              errors={errors}
            />
            <button
              type="submit"
              className="h-[2.75rem] rounded p-3 grid gap-[0.625rem] bg-black hover:bg-slate-900 hover:border-white justify-center"
              data-testid="submitRequiredCode"
              data-button="submitRequiredCode"
            >
              <span className="text-white font-medium text-base leading-5 h-5 w-auto truncate">
                Send
              </span>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default CodeEmail;
