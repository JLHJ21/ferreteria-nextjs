"use client";
import { createBill } from "@/actions/bills/action-bills";
import { createClient } from "@/actions/clients/action-clients";
import TextErrors from "@/components/errors/text-errors";
import Input from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/utils/validations-regex";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsSubmit = {
    reasonInput: string;
    moneyInput: string;
    currencyInput: string
};

type Currencies = {
    data: { title: string, value: string }[]
}

const BillsAddBody = ({ data }: Currencies) => {
    const [errorsGlobal, setErrorsGlobal] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsSubmit>();
    const { callsModal } = ErrorsProcess();

    const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
        const result = await createBill(
            data.reasonInput,
            data.moneyInput,
            data.currencyInput
        );
        if (result.code === 201) {
            alert('Gasto creado');
            router.push('/bills')
        } else {
            setErrorsGlobal(result.result)
            callsModal({ error: result.code, message: result.result });
        }
    };


    const { patternText, patternNumber } = validation();
    const patternTextRegex = { pattern: patternText(), min: 2, max: 255 };
    const patternNumberRegex = { pattern: patternNumber(), min: 1, max: 20 };

    return (
        <div className="container">
            <TextErrors errorMessage={errorsGlobal} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="row border rounded p-4 px-5 py-3">

                <div className="d-flex justify-content-between">
                    <h2>Crear nuevo gasto</h2>
                </div>

                <Input
                    classContainer={"col-4"}
                    labelTitle={"Razón"}
                    id={"reasonInput"}
                    inputType={"text"}
                    inputPlaceholder={"Tipo de razón"}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'razón' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Input
                    classContainer={"col-4 mb-4"}
                    labelTitle={"Dinero"}
                    id={"moneyInput"}
                    inputType={"text"}
                    inputPlaceholder={"150,00"}
                    inputPattern={patternNumberRegex}
                    labelError={"El campo 'dinero' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Select
                    classContainer={"col-4 mb-4"}
                    labelTitle={"Divisa"}
                    id={"currencyInput"}
                    inputPlaceholder={"HELLLOW"}
                    inputPattern={patternNumberRegex}
                    labelError={"El campo 'divisa' es requerido"}
                    register={register}
                    errors={errors}
                    options={data}
                />


                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default BillsAddBody;
