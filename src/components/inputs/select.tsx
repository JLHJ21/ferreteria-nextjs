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
    inputPlaceholder: string;
    inputPattern: {
        pattern: RegExp;
        min: number;
        max: number;
    };
    labelError: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    options: {
        title: string,
        value: string
    }[]
};

const Select = <T extends FieldValues>({
    id,
    register,
    errors,
    ...props
}: propsInput<T>) => {

    const classLabel = "form-label mb-1";
    const classError = "text-red-700 flex align-start";

    return (
        <div className={props.classContainer}>
            <label htmlFor={id} className={classLabel}>
                {props.labelTitle}
            </label>
            <select className="form-select"
                id={id}
                {...register(id as Path<T>, {
                    required: true,
                    pattern: props.inputPattern.pattern,
                    minLength: props.inputPattern.min,
                    maxLength: props.inputPattern.max,
                })}
            >
                <option defaultChecked hidden >{props.inputPlaceholder}</option>
                {
                    props.options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.title}</option>
                        )
                    })
                }

            </select>

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

export default Select;
