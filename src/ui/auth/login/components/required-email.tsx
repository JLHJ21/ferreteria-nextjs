import type React from "react";
import { useContext } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import LoginContext from "./login-context";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/components/validations-regex";
import { recoverPassword } from "@/actions/login/action-login";
import InputDisabled from "@/components/inputs/input-disabled";
import Input from "@/components/inputs/input";

type InputsSubmit = {
  emailRecoverInput: string;
};

type propsRequired = {
  passEmail: boolean;
  setPassEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequiredEmail = (props: propsRequired) => {
  const { callsModal } = ErrorsProcess();
  const { setEmailUser } = useContext(LoginContext);

  const { patternEmail } = validation();
  const patternInputEmail = { pattern: patternEmail(), min: 1, max: 255 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSubmit>();

  const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
    const result = await recoverPassword(data.emailRecoverInput);
    if (result.ok === true) {
      props.setPassEmail(true);
      setEmailUser(data.emailRecoverInput);
      alert("A code was send to your email to confirm your identity");
    } else {
      callsModal({ error: result.code, message: result.result });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="formRequiredEmail"
      className="w-[24.5rem] text-black rounded-[0.25rem] bg-white"
    >
      <div className="grid gap-6">
        {props.passEmail ? (
          <>
            {/* Email input */}
            <InputDisabled
              classContainer={"flex flex-col grap gap-2"}
              labelTitle={"Email"}
              id={"emailRecoverInputDisabled"}
              inputType={"email"}
              inputPlaceholder={"Your email address"}
              inputPattern={patternInputEmail}
              labelError={"The field email is required"}
              spanInput={false}
              register={register}
              errors={errors}
            />
          </>
        ) : (
          <>
            {/* Email input */}
            <Input
              classContainer={"flex flex-col grap gap-2"}
              labelTitle={"Email"}
              id={"emailRecoverInput"}
              inputType={"email"}
              inputPlaceholder={"Your email address"}
              inputPattern={patternInputEmail}
              labelError={"The field email is required"}
              spanInput={false}
              register={register}
              errors={errors}
            />
            <button
              type="submit"
              className="h-[2.75rem] rounded p-3 grid gap-[0.625rem] bg-black hover:bg-slate-900 hover:border-white justify-center"
              data-button="submitRequiredEmail"
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

export default RequiredEmail;
