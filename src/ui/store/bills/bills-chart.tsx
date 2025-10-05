"use client";

import { getDateResults } from "@/actions/bills/action-bills";
import BarChart from "@/components/charts/bar-chart";
import InputDateTime from "@/components/inputs/input-datetime";
import formatDatetimeLocal, { getMonday, getSunday } from "@/components/js/functions";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import validation from "@/utils/validations-regex";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BillContext from "./bill-context";

type PropsGraphics = {
    graphics: { month: string, money: string }[]
}

type InputsSubmit = {
    beginDate: Date;
    endDate: Date
};

const currentDate = new Date();
const firstDayWeek = getMonday(currentDate);
const lastDayWeek = getSunday(currentDate);

const BillsCharts = (props: PropsGraphics) => {

    const { secondGraphic, setSecondGraphic } = useContext(BillContext);
    const [begin, setBegin] = useState(formatDatetimeLocal(firstDayWeek));
    const [end, setEnd] = useState(formatDatetimeLocal(lastDayWeek));

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputsSubmit>();
    const { callsModal } = ErrorsProcess();
    console.log(props.graphics)
    const onSubmit: SubmitHandler<InputsSubmit> = async (data) => {
        const result = await getDateResults(
            String(data.beginDate),
            String(data.endDate)
        );
        if (result.code === 201) {
            setSecondGraphic(result.result as { month: string, money: string }[]);
        } else {
            callsModal({ error: result.code, message: result.result as string });
        }
    };

    const { patternText } = validation();
    const patternTextRegex = { pattern: patternText(), min: 2, max: 255 };
    return (
        <div className="row">
            <div className="col-6 d-flex ">
                <div className="border rounded p-3 w-100">
                    <BarChart label="Dinero gastado" results={props.graphics} />
                </div>
            </div>
            <div className="col-6 d-flex">
                <form
                    onSubmit={handleSubmit(onSubmit)}

                    className="border rounded p-3 w-100 d-flex flex-column">
                    <div className="row gx-2">
                        <InputDateTime
                            classContainer={"col-5"}
                            id={"beginDate"}
                            inputType={"datetime-local"}
                            inputPlaceholder={"T"}
                            labelError={""}
                            register={register}
                            errors={errors}
                            value={begin}
                            onPress={(e) => {
                                const value = e.currentTarget.value;
                                setBegin(value);
                            }}
                        />
                        <InputDateTime
                            classContainer={"col-5"}
                            id={"endDate"}
                            inputType={"datetime-local"}
                            inputPlaceholder={"T"}
                            labelError={""}
                            register={register}
                            errors={errors}
                            value={end}
                            onPress={(e) => {
                                const value = e.currentTarget.value;
                                setEnd(value);
                            }}
                        />

                        <div className="col-2">
                            <button className="btn btn-primary text-truncate w-100">Buscar</button>
                        </div>
                    </div>
                    <BarChart label="Dinero gastado" results={secondGraphic[0].month !== "" ? secondGraphic : props.graphics} />
                </form>
            </div>
        </div>
    )
}

export default BillsCharts;
