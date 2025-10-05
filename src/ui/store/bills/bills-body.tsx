"use client";
import Link from "next/link";
import BillsCharts from "./bills-chart";
import { GenericTable } from "@/ui/templates/table";
import { TableColumn } from "react-data-table-component";
import { useState } from "react";
import BillContext from "./bill-context";

type BillsBodyProps = {
    data: { id: number; reason: string; money: string, currency: string, date: string, status: string }[];
    graphics: { month: string, money: string }[],
}


type Bills = {
    id: number; reason: string; money: string, currency: string, date: string, status: string
};
const BillsBody = (props: BillsBodyProps) => {
    const columns: TableColumn<Bills>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: "5rem"
        },
        {
            name: 'Razón',
            selector: row => row.reason,
            sortable: true,
        },
        {
            name: 'Dinero',
            selector: row => row.money,
            sortable: true,
        },
        {
            name: 'Divisa',
            selector: row => row.currency,
            sortable: true,
            width: "10rem"

        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true,
            width: "10rem"

        },
        {
            name: "Opciones",
            cell: (row) => (
                <div className="d-flex gap-2 justify-content-center">
                    <button
                        className="btn btn-primary btn-sm text-truncate"
                        onClick={() => console.log("Modificar", row.id)}
                    >
                        Modificar
                    </button>
                    <button
                        className="btn btn-danger btn-sm text-truncate"
                        onClick={() => console.log("Eliminar", row.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];
    const [secondGraphic, setSecondGraphic] = useState<{ month: string, money: string }[]>([{ month: "", money: "" }])

    return (
        <BillContext.Provider value={{ secondGraphic, setSecondGraphic }}>
            <div className="container">
                <div className="row px-5 py-3">
                    <div className="d-flex justify-content-between mb-2">
                        <p className="fs-5 fw-bold mt-3">Gastos</p>
                        <Link href={'bills/add'} >
                            <button type="button" className="btn btn-primary">Nuevo</button>
                        </Link>
                    </div>

                    <BillsCharts graphics={props.graphics} />

                    <GenericTable<Bills>
                        data={props.data}
                        columns={columns}
                        filterKeys={["id", "reason", "money", "currency", "date", "status"]}
                    />
                </div>
            </div>
        </BillContext.Provider>

    )
}

export default BillsBody;
