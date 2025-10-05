"use client";
import { createCurrency } from "@/actions/currencies/action-currencies";
import TextErrors from "@/components/errors/text-errors";
import Input from "@/components/inputs/input";
import InputWithOnPress from "@/components/inputs/input-with-onpress";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/utils/validations-regex";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type InputsSubmit = {
    currencyInput: string;
    acronymInput: string;
} & {
    [key: `conversionType${string}`]: string;
} & {
    [key: `conversionInput${string}`]: string;
};

type Currencies = {
    othersCurrencies: { acronym: string }[]
}

const CurrenciesAddBody = ({ othersCurrencies }: Currencies) => {
    const [errorsGlobal, setErrorsGlobal] = useState("");
    const [dataCurrencies, setDataCurrencies] = useState<{ type: string; conversion: string, id: string }[]>([{ type: "USD", conversion: "0", id: "" }]);
    const router = useRouter();
    const conversionChangeSelect = (index: number, type: string, id: string) => {
        const newInfo = [...dataCurrencies];
        newInfo[index] = { ...newInfo[index], type: type, id: id };
        setDataCurrencies(newInfo);
    };

    const conversionChangeInput = (index: number, conversion: string) => {
        const newInfo = [...dataCurrencies];
        newInfo[index] = { ...newInfo[index], conversion: conversion };
        setDataCurrencies(newInfo);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsSubmit>();
    const { callsModal } = ErrorsProcess();

    const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
        const result = await createCurrency(
            data.currencyInput,
            data.acronymInput,
            dataCurrencies
        );
        if (result.code === 201) {
            alert('Divisa creada');
            router.push('/currencies')
        } else {
            setErrorsGlobal(result.result)
            callsModal({ error: result.code, message: result.result });
        }
    };


    const { patternText, patternNumber } = validation();
    const patternTextRegex = { pattern: patternText(), min: 2, max: 5 };
    const patternNumberRegex = { pattern: patternNumber(), min: 1, max: 150 };


    return (
        <div className="container">
            <TextErrors errorMessage={errorsGlobal} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="row border rounded p-4 px-5 py-3">

                <div className="d-flex justify-content-between">
                    <h2>Crear nueva divisa</h2>
                </div>

                <Input
                    classContainer={"col-2"}
                    labelTitle={"Nueva divisa"}
                    id={"currencyInput"}
                    inputType={"text"}
                    inputPlaceholder={"Tu nueva divisa"}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'divisa' es requerido"}
                    register={register}
                    errors={errors}
                />

                <Input
                    classContainer={"col-2"}
                    labelTitle={"Abreviación"}
                    id={"acronymInput"}
                    inputType={"text"}
                    inputPlaceholder={"USD..."}
                    inputPattern={patternTextRegex}
                    labelError={"El campo 'abreviación de la divisa' es requerido"}
                    register={register}
                    errors={errors}
                />

                <div className="col-8">
                    {
                        othersCurrencies.map((currency, index) => {
                            const dictionary = currency.acronym.split("|");

                            return (
                                <div className="row pb-4" key={index}>

                                    <div className="col-8">
                                        <label htmlFor={"conversionType" + dictionary[0]} className="form-label mb-1">
                                            Operación de conversión con {dictionary[0]}
                                        </label>
                                        <select className="form-select" id={"conversionType" + dictionary[0]}

                                            onChange={(e) => conversionChangeSelect(index, e.target.value, dictionary[1])}
                                        >
                                            <option defaultChecked hidden>Open this select menu</option>
                                            <option value="multiple">Multiplicación</option>
                                            <option value="division">División</option>
                                            <option value="plus">Suma</option>
                                            <option value="subtraction">Resta</option>
                                        </select>
                                    </div>

                                    <InputWithOnPress
                                        classContainer={"col-4"}
                                        labelTitle={""}
                                        id={"conversionInput" + dictionary[0]}
                                        inputType={"text"}
                                        inputPlaceholder={"Ej: 150 (150 * 1)"}
                                        inputPattern={patternNumberRegex}
                                        labelError={"El campo 'conversión' es requerido"}
                                        register={register}
                                        errors={errors}
                                        onPress={(e) => {
                                            const value = e.currentTarget.value;
                                            conversionChangeInput(index, value);
                                        }}
                                    />

                                </div>
                            )
                        })
                    }

                </div>

                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CurrenciesAddBody;
