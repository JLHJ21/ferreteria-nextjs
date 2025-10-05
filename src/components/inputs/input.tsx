import React from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type propsInput<T extends FieldValues> = {
  classContainer: string;
  labelTitle: string;
  id: string;
  inputType: string;
  inputPlaceholder: string;
  inputPattern: {
    pattern: RegExp;
    min: number;
    max: number;
  };
  labelError: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const Input = <T extends FieldValues>({
  id,
  register,
  errors,
  ...props
}: propsInput<T>) => {

  const classDiv = "input-group has-validation";
  const classLabel = "form-label mb-1";
  const classInput = "form-control";
  const classError = "text-red-700 flex align-start";

  return (
    <div className={props.classContainer}>
      <label htmlFor={id} className={classLabel}>
        {props.labelTitle}
      </label>
      <input
        className={classInput}
        type={props.inputType}
        autoComplete={props.inputType === "password" ? "password" : ""}
        id={id}
        data-input={id}
        placeholder={props.inputPlaceholder}
        {...register(id as Path<T>, {
          required: true,
          pattern: props.inputPattern.pattern,
          minLength: props.inputPattern.min,
          maxLength: props.inputPattern.max,
        })}
      />

      {/* VALIDACION */}
      <div className="invalid-feedback">{props.labelError}</div>

      {errors[id] && (
        <small className={classError}>
          <small>{props.labelError}</small>
        </small>
      )}
    </div>
  );
};

export default Input;
