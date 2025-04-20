"use client";

import ButtonRedirection from "@/components/buttons/button-redirection";
import ButtonSimple from "@/components/buttons/button-simple";
import CheckboxWithLabel from "@/components/inputs/checkbox-with-label";
import InputWithSpan from "@/components/inputs/input-span";
import validation from "@/components/validations-regex";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextOpenModal from "../text-open-modal";
import TextErrors from "@/components/errors/text-errors";
import { useState } from "react";

type InputsSubmit = {
  userInput: string;
  passwordInput: string;
};

const LoginForm = () => {
  const [errorsGlobal, setErrorsGlobal] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsSubmit>();

  const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
    /**/
  };

  const { patternText } = validation();
  const patternTextRegex = { pattern: patternText(), min: 3, max: 150 };

  return (
    <>
      <TextErrors errorMessage={errorsGlobal} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="needs-validation"
        noValidate
      >
        {/*method="POST"*/}
        <InputWithSpan
          classContainer={"col-12"}
          labelTitle={"Nombre de usuario"}
          id={"userInput"}
          inputType={"text"}
          inputPlaceholder={"Tu nombre de usuario"}
          inputPattern={patternTextRegex}
          labelError={"El campo 'usuario' es requerido"}
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
          inputPlaceholder={"Tu contraseña"}
          inputPattern={patternTextRegex}
          labelError={"El campo 'contraseña' es requerida"}
          spanInput={false}
          register={register}
          errors={errors}
          iconSpan={"@"}
        />

        <div className="row pt-2 ps-4">
          <div className="container d-flex justify-content-between align-self-center pt-1">
            <CheckboxWithLabel
              className="form-check form-check-lg"
              text="Recordarme"
              id="remember"
            />
            <TextOpenModal />
          </div>
        </div>

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
              direction="register"
              text="¿No tienes una cuenta?"
              className="text-truncate w-100 text-center cursor-pointer"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
