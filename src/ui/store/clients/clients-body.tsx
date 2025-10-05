"use client";

import { GenericTable } from "@/ui/templates/table";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";

type ClientsBodyProps = {
    data: { id: number; name: string; document: string, status: string }[];
}

type Clients = {
    id: number; name: string; document: string, status: string
};
const ClientsBody = (props: ClientsBodyProps) => {

    const columns: TableColumn<Clients>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: "5rem"
        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Cédula',
            selector: row => row.document,
            sortable: true,
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
                    <p className="fs-5 fw-bold mt-3 mb-0">Clientes</p>
                    <Link href={'clients/add'} >
                        <button type="button" className="btn btn-primary">Nuevo</button>
                    </Link>
                </div>

                <GenericTable<Clients>
                    data={props.data}
                    columns={columns}
                    filterKeys={["id", "name", "document", "status"]}
                />
            </div>
        </div>
    )
}

export default ClientsBody;
