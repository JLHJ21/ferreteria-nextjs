import React from "react";
import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

type propsInput<T extends FieldValues> = {
    classContainer: string;
    id: string;
    inputType: string;
    inputPlaceholder: string;

    value: string;
    labelError: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    onPress: (e: React.KeyboardEvent<HTMLInputElement>) => void; // <-- cambia aquí

};

const InputDateTime = <T extends FieldValues>({
    id,
    register,
    errors,
    ...props
}: propsInput<T>) => {

    const classInput = "form-control";
    const classError = "text-red-700 flex align-start";

    return (
        <div className={props.classContainer}>
            <input
                className={classInput}
                type="datetime-local"
                id={id}
                value={props.value}
                {...register(id as Path<T>, {
                    onChange: (e) => {
                        props.onPress(e);
                        // Llamada al onChange de react-hook-form
                        e.target.value = e.target.value; // Si necesitas actualizar el valor manualmente
                    },
                    required: true,
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

export default InputDateTime;
