"use client";

import BarChart from "@/components/charts/bar-chart";
import formatDatetimeLocal, { getMonday, getSunday } from "@/components/js/functions";
import React from "react";

const PurchasesCharts = () => {
    const currentDate = new Date();

    const firstDayWeek = getMonday(currentDate);
    const lastDayWeek = getSunday(currentDate);

    const firstDayWeekFormatted = formatDatetimeLocal(firstDayWeek);
    const lastDayWeekFormatted = formatDatetimeLocal(lastDayWeek);

    return (
        <div className="row">
            <div className="col-6 d-flex ">
                <div className="border rounded p-3 w-100">
                    <BarChart label="Dinero ganado BRUTO" />
                </div>
            </div>
            <div className="col-6 d-flex">
                <div className="border rounded p-3 w-100 d-flex flex-column">
                    <div className="row gx-2">
                        <div className="col-5">
                            <input type="datetime-local" defaultValue={firstDayWeekFormatted} className="form-control" />
                        </div>

                        <div className="col-5">
                            <input type="datetime-local" defaultValue={lastDayWeekFormatted} className="form-control" />
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary text-truncate w-100">Buscar</button>
                        </div>
                    </div>
                    <BarChart label="Dinero ganado BRUTO" />
                </div>
            </div>
        </div>
    )
}

export default PurchasesCharts;
