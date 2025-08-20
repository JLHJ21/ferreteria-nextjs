"use client";

import { sendRegister } from "@/actions/register/action-register";
import ButtonRedirection from "@/components/buttons/button-redirection";
import ButtonSimple from "@/components/buttons/button-simple";
import InputWithSpan from "@/components/inputs/input-span";
import validation from "@/components/validations-regex";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import { Dispatch, SetStateAction, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type InputsSubmit = {
  firstInput: string;
  lastInput: string;
  emailInput: string;
  passwordInput: string;
  repeatInput: string;
};

type RegisterFormProps = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  setDataUser: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
    }>
  >;
};


const RegisterForm = (props: RegisterFormProps) => {
  const [errorsGlobal, setErrorsGlobal] = useState("");
  const { callsModal } = ErrorsProcess();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSubmit>();

  const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
    const result = await sendRegister(
      data.firstInput,
      data.lastInput,
      data.emailInput,
      data.passwordInput,
      data.repeatInput
    );
    if (result.ok === true) {
      props.setOpen(true);
      props.setDataUser({
        name: result.result.name,
        email: result.result.email,
      });
    } else {
      callsModal({ error: result.code, message: result.result.email });
    }
  };

  const { patternText } = validation();
  const patternTextRegex = { pattern: patternText(), min: 3, max: 150 };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="needs-validation"
      noValidate
    >
      {/*method="POST"*/}
      <InputWithSpan
        classContainer={"col-12 "}
        labelTitle={"Nombre de usuario"}
        id={"userInput"}
        inputType={"text"}
        inputPlaceholder={"Escribe tu nombre de usuario"}
        inputPattern={patternTextRegex}
        labelError={"El campo 'nombre de usuario' es requerido"}
        spanInput={false}
        register={register}
        errors={errors}
        iconSpan={"@"}
      />

      <InputWithSpan
        classContainer={"col-12 pt-3"}
        labelTitle={"Nombre personal"}
        id={"nameInput"}
        inputType={"text"}
        inputPlaceholder={"Escribe tu nombre personal"}
        inputPattern={patternTextRegex}
        labelError={"El campo 'nombre personal' es requerido"}
        spanInput={false}
        register={register}
        errors={errors}
        iconSpan={"@"}
      />

      <InputWithSpan
        classContainer={"col-12 pt-3"}
        labelTitle={"Correo electrónico"}
        id={"nameInput"}
        inputType={"email"}
        inputPlaceholder={"Escribe tu correo"}
        inputPattern={patternTextRegex}
        labelError={"El campo 'correo electrónico' es requerido"}
        spanInput={false}
        register={register}
        errors={errors}
        iconSpan={"@"}
      />

      <InputWithSpan
        classContainer={"col-12 pt-3"}
        labelTitle={"Contraseña"}
        id={"passwordInput"}
        inputType={"text"}
        inputPlaceholder={"Escribe tu contraseña"}
        inputPattern={patternTextRegex}
        labelError={"El campo 'contraseña' es requerida"}
        spanInput={false}
        register={register}
        errors={errors}
        iconSpan={"@"}
      />

      <InputWithSpan
        classContainer={"col-12 pt-3"}
        labelTitle={"Repetir contraseña"}
        id={"repeatInput"}
        inputType={"password"}
        inputPlaceholder={"Repita la contraseña"}
        inputPattern={patternTextRegex}
        labelError={"El campo 'repetir contraseña' es requerida"}
        spanInput={false}
        register={register}
        errors={errors}
        iconSpan={"@"}
      />

      <div className="pt-3">
        <ButtonSimple
          buttonType="submit"
          className="btn btn-primary w-100"
          text={"Enviar"}
        />
      </div>

      <div className="row justify-content-center pt-3">
        <div className="col-12 col-md-5 pt-3 pt-md-0 text-center">
          <ButtonRedirection
            direction="/login"
            text="¿Ya tienes una cuenta?"
            className="text-truncate w-100 text-center cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
