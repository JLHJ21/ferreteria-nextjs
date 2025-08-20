"use client";

type CurrenciesBodyProps = {
    data: { id: number; reason: string; money: string, currency: string, date: string }[];
}

const CurrenciesBody = (props: CurrenciesBodyProps) => {
    const labelsTitle = ["Divisa - Preferencial", "Divisa - Convertir", "Conversión"];

    const itemsCurrencies = ["Dólares", "Pesos", "Bolívares"]

    return (
        <div className="container">
            <div className="row px-5 py-3">

                <div className="col-6 border rounded p-4">

                    <h2>Información</h2>


                    <p className="mb-2">Divisa preferencial</p>

                    <select className="form-select" aria-label="Default select example">
                        {
                            itemsCurrencies.map((item, index) => {
                                return (
                                    <option value={index} key={index}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-2">Enviar</button>
                    </div>

                    <h5 className="pt-2">Dinero en caja registradora</h5>
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Divisa</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-25">Dólares</td>
                                <td className="w-25">213</td>
                            </tr>
                            <tr>
                                <td className="w-25">Pesos</td>
                                <td className="w-25">52,000</td>
                            </tr>

                            <tr>
                                <td className="w-25">Bolívares</td>
                                <td className="w-25">1,358.52</td>
                            </tr>

                        </tbody>
                    </table>

                    <h5 className="pt-2">Conversiones</h5>
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                {
                                    labelsTitle.map((label, index) => {
                                        return (
                                            <th scope="col" key={index}>{label}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-25">Dólares</td>
                                <td className="w-25">Pesos</td>
                                <td className="w-25">1 = 4,000</td>
                            </tr>
                            <tr>
                                <td className="w-25">Dólares</td>
                                <td className="w-25">Bolívares</td>
                                <td className="w-25">1 = 131,12</td>
                            </tr>

                            <tr>
                                <td className="w-25">Dólares</td>
                                <td className="w-25">Euros</td>
                                <td className="w-25">1 = 0,86</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
                <div className="col-6">

                    <div className="row px-5 py-3">
                        <div className="d-flex justify-content-between">
                            <p className="fs-5 fw-bold mt-3 mb-0">Divisas añadidas</p>
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
                                            <th className="">Divisa - Nombre</th>
                                            <th className="text-center">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="w-25">Dólares</td>
                                            <td className="w-25 text-center">Activo</td>
                                        </tr>
                                        <tr>
                                            <td className="w-25">Pesos</td>
                                            <td className="w-25 text-center">Activo</td>
                                        </tr>

                                        <tr>
                                            <td className="w-25">Bolívares</td>
                                            <td className="w-25 text-center">Activo</td>
                                        </tr>

                                        <tr>
                                            <td className="w-25">Euros</td>
                                            <td className="w-25 text-center">Eliminado</td>
                                        </tr>
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

            </div>
        </div>
    )
}

export default CurrenciesBody;
