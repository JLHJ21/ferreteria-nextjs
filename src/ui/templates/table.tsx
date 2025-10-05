"use client";

import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { customDesign } from "./custom-table";

customDesign();

type GenericTableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    placeholder?: string;
    filterKeys?: (keyof T)[];
};

export function GenericTable<T extends Record<string, any>>({
    data,
    columns,
    placeholder = "Buscar...",
    filterKeys,
}: GenericTableProps<T>) {
    const [filterText, setFilterText] = useState("");
    const [filteredData, setFilteredData] = useState<T[]>([]);

    useEffect(() => {
        if (!filterKeys || filterKeys.length === 0) {
            setFilteredData(
                data.filter((item) =>
                    JSON.stringify(item)
                        .toLowerCase()
                        .includes(filterText.toLowerCase())
                )
            );
        } else {
            setFilteredData(
                data.filter((item) =>
                    filterKeys.some((key) =>
                        String(item[key] ?? "")
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    )
                )
            );
        }
    }, [filterText, data, filterKeys]);

    return (
        <div className="col-12 pb-2 table-responsive">
            <div className="d-flex justify-content-between gap-3 my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <button className="btn btn-primary">Buscar</button>
            </div>

            <div className="border rounded p-2">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationComponentOptions={{
                        rowsPerPageText: "Filas por página",
                        selectAllRowsItem: true,
                        selectAllRowsItemText: "Todos",
                    }}
                    responsive
                    highlightOnHover
                    theme={"black"}
                />
            </div>
        </div>
    );
}
