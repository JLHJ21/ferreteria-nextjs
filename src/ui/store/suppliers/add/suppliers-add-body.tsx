"use client";
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
    supplierInput: string;
    rifInput: string;
    addressInput: string;
};

const SuppliersAddBody = () => {
    const [errorsGlobal, setErrorsGlobal] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsSubmit>();
    const { callsModal } = ErrorsProcess();

    const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
        const result = await createSupplier(
            data.supplierInput,
            data.rifInput,
            data.addressInput
        );
        if (result.code === 201) {
            alert('Proveedor creado');
            router.push('/suppliers')
        } else {
            setErrorsGlobal(result.result)
            callsModal({ error: result.code, message: result.result });
        }
    };


    const { patternText } = validation();
    const patternTextRegex = { pattern: patternText(), min: 2, max: 255 };

    return (
        <div className="container">
            <TextErrors errorMessage={errorsGlobal} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="row border rounded p-4 px-5 py-3">

                <div className="d-flex justify-content-between">
                    <h2>Crear nuevo proveedor</h2>
                </div>

                <Input
                    classContainer={"col-4"}
                    labelTitle={"Nombre"}
                    id={"supplierInput"}
                    inputType={"text"}
                    inputPlaceholder={"Nombre del proveedor"}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'nombre' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Input
                    classContainer={"col-4"}
                    labelTitle={"RIF"}
                    id={"rifInput"}
                    inputType={"text"}
                    inputPlaceholder={"301347274"}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'rif' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Input
                    classContainer={"col-4 mb-4"}
                    labelTitle={"Dirección"}
                    id={"addressInput"}
                    inputType={"text"}
                    inputPlaceholder={"Venezuela..."}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'dirección' es requerido"}
                    register={register}
                    errors={errors}
                />

                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default SuppliersAddBody;
