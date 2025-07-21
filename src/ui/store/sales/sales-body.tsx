"use client";

type SalesBodyProps = {
    data: { id: number; product: string; amount: number; price: string }[];
}

const SalesBody = (props: SalesBodyProps) => {
    const labelsTitle = ["#", "Producto", "Cantidad", "Precio", "Opciones"];

    return (
        <div className="container">
            <div className="row px-5 py-3">
                <div className="d-flex justify-content-between">
                    <p className="fs-5 fw-bold mt-3 mb-0">Ventas</p>
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
                                                <th className="w-25" scope="row">{item.id}</th>
                                                <td className="w-25">{item.product}</td>
                                                <td className="w-25">{item.amount}</td>
                                                <td className="w-25">{item.price}</td>
                                                <td className="d-flex gap-2 justify-content-evenly">
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

export default SalesBody;
