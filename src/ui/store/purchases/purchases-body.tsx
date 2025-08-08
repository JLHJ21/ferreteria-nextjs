"use client";

type PurchasesBodyProps = {
    data: { id: number; supplier: string; amount: number, money: string, date: string }[];
}

const PurchasesBody = (props: PurchasesBodyProps) => {
    const labelsTitle = ["#", "Proveedor/es", "Cantidad de prd.", "Dinero", "Fecha", "Opciones"];

    return (
        <div className="container">
            <div className="row px-5 py-3">
                <div className="d-flex justify-content-between">
                    <p className="fs-5 fw-bold mt-3 mb-0">Compras</p>
                </div>
                <div className="col-12 pb-2 table-responsive">
                    <div className="d-flex justify-content-between gap-3 my-3">
                        <input type="email" className="form-control" placeholder="Buscar..." />
                        <button className="btn btn-primary">Buscar</button>
                    </div>
                    <div className="border rounded p-2">

                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    {
                                        labelsTitle.map((label, index) => {
                                            return (
                                                <th className={`${label === "Opciones" && "text-center"} `} scope="col" key={index}>{label}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="w-10" scope="row">{item.id}</td>
                                                <td className="">{item.supplier}</td>
                                                <td className="">{item.amount}</td>
                                                <td className="">{item.money}</td>
                                                <td className="">{item.date}</td>
                                                <td className="d-flex gap-2 justify-content-center">
                                                    <button className="btn btn-primary btn-sm text-truncate">Modificar</button>
                                                    <button className="btn btn-danger btn-sm text-truncate">Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>


                        </table>

                    </div>

                </div>

                <nav className="d-flex justify-content-center mt-2" aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default PurchasesBody;
