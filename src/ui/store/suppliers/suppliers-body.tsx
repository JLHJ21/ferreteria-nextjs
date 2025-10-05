"use client";

import { GenericTable } from "@/ui/templates/table";
import Link from "next/link";
import { TableColumn } from 'react-data-table-component';


type SuppliersBodyProps = {
    data: { id: number; address: string; name: string, rif: string, status: string }[];
}
type Supplier = {
    id: number; address: string; name: string, rif: string, status: string
};

const SuppliersBody = (props: SuppliersBodyProps) => {
    const columns: TableColumn<Supplier>[] = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: "5rem"
        },
        {
            name: 'Dirección',
            selector: row => row.address,
            sortable: true,
            width: "16rem"

        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
            width: "16rem"
        },
        {
            name: 'RIF',
            selector: row => row.rif,
            sortable: true,
            width: "12rem"
        },
        {
            name: 'Estado',
            selector: row => row.status,
            sortable: true,
            width: "8rem"
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
                    <p className="fs-5 fw-bold mt-3 mb-0">Proveedores</p>
                    <Link href={'suppliers/add'} >
                        <button type="button" className="btn btn-primary">Nuevo</button>
                    </Link>
                </div>

                <GenericTable<Supplier>
                    data={props.data}
                    columns={columns}
                    filterKeys={["id", "address", "name", "rif"]}
                />
            </div>
        </div>
    )
}

export default SuppliersBody;
