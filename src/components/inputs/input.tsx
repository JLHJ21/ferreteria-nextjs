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
  spanInput: string | boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const Input = <T extends FieldValues>({
  id,
  register,
  errors,
  ...props
}: propsInput<T>) => {
  const classLabel =
    "text-gray-light text-base leading-5 font-medium h-5 pb-2 w-auto truncate";
  const classInput =
    "focus:outline-blacktext-base placeholder:font-normal placeholder:text-base placeholder:truncate placeholder:leading-[20px] grid gap-[0.625rem] gray-light-soft h-11 p-3 rounded-[0.25rem] border border-pastel-soft";

  const extraLabelSpan = () => {
    const html = (
      <div className="flex flex-wrap justify-between h-5">
        <label htmlFor={id} className={classLabel}>
          {props.labelTitle}
        </label>
        <span className="flex justify-end ml-auto text-black text-sm leading-4 font-medium hover:underline hover:cursor-pointer max-w-[7.063rem] truncate items-center">
          {props.spanInput}
        </span>
      </div>
    );
    return html;
  };

  return (
    <div className={props.classContainer}>
      {props.spanInput !== false ? (
        extraLabelSpan()
      ) : (
        <label htmlFor={id} className={classLabel}>
          {props.labelTitle}
        </label>
      )}
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
      {errors[id] && (
        <small className="text-red-700 flex align-start">
          <small>{props.labelError}</small>
        </small>
      )}
    </div>
  );
};

export default Input;
