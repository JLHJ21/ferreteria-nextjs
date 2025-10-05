"use client";

import { GenericTable } from "@/ui/templates/table";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";

type LoansBodyProps = {
    data: { id: number; client: string; money: string, currency: string, paid: string, date: string, status: string }[];
}

type Loans = {
    id: number; client: string; money: string, currency: string, paid: string, date: string, status: string
};
const LoansBody = (props: LoansBodyProps) => {

    const columns: TableColumn<Loans>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: "5rem"
        },
        {
            name: 'Dado a',
            selector: row => row.client,
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
            name: 'Pagado',
            selector: row => row.paid,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true,
            width: "10rem"

        },

        {
            name: 'Estado',
            selector: row => row.status,
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

    return (
        <div className="container">
            <div className="row px-5 py-3">
                <div className="d-flex justify-content-between">
                    <p className="fs-5 fw-bold mt-3 mb-0">Prestamos</p>
                    <Link href={'loans/add'} >
                        <button type="button" className="btn btn-primary">Nuevo</button>
                    </Link>
                </div>
                <GenericTable<Loans>
                    data={props.data}
                    columns={columns}
                    filterKeys={["id", "client", "money", "currency", "paid", "date", "status"]}
                />
            </div>
        </div>
    )
}

export default LoansBody;
