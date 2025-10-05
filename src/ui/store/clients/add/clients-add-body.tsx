"use client";
import { createClient } from "@/actions/clients/action-clients";
import { createSupplier } from "@/actions/suppliers/action-suppliers";
import TextErrors from "@/components/errors/text-errors";
import Input from "@/components/inputs/input";
import InputWithOnPress from "@/components/inputs/input-with-onpress";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/utils/validations-regex";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type InputsSubmit = {
    clientInput: string;
    idInput: string;
};

const ClientsAddBody = () => {
    const [errorsGlobal, setErrorsGlobal] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsSubmit>();
    const { callsModal } = ErrorsProcess();

    const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
        const result = await createClient(
            data.clientInput,
            data.idInput
        );
        if (result.code === 201) {
            alert('Cliente creado');
            router.push('/clients')
        } else {
            setErrorsGlobal(result.result)
            callsModal({ error: result.code, message: result.result });
        }
    };


    const { patternText, patternNumber } = validation();
    const patternTextRegex = { pattern: patternText(), min: 2, max: 255 };
    const patternNumberRegex = { pattern: patternNumber(), min: 5, max: 20 };

    return (
        <div className="container">
            <TextErrors errorMessage={errorsGlobal} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="row border rounded p-4 px-5 py-3">

                <div className="d-flex justify-content-between">
                    <h2>Crear nuevo cliente</h2>
                </div>

                <Input
                    classContainer={"col-6"}
                    labelTitle={"Nombre"}
                    id={"clientInput"}
                    inputType={"text"}
                    inputPlaceholder={"Nombre del cliente"}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'nombre' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Input
                    classContainer={"col-6 mb-4"}
                    labelTitle={"Cédula"}
                    id={"idInput"}
                    inputType={"text"}
                    inputPlaceholder={"301347274"}
                    inputPattern={patternNumberRegex}
                    labelError={"El campo 'cédula' es requerido"}
                    register={register}
                    errors={errors}
                />


                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default ClientsAddBody;
