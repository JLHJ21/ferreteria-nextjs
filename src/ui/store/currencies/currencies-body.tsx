"use client";
import Link from "next/link";

type CurrenciesBodyProps = {
    data: {
        currencies: { name: string, money: string, state: string }[],
        conversion: { from_name: string, to_name: string, number: string, operation: string }[];
    }[]
}

const CurrenciesBody = (props: CurrenciesBodyProps) => {
    const labelsTitle = ["Divisa - Preferencial", "Divisa - Convertir", "Conversión"];
    const itemsCurrencies = ["Dólares", "Pesos", "Bolívares"]

    return (
        <div className="container">
            <div className="row px-5 py-3">

                <div className="col-6 border rounded p-4">

                    <div className="d-flex justify-content-between">
                        <h2>Información</h2>
                        <Link href={'currencies/add'} >
                            <button type="button" className="btn btn-primary">Nuevo</button>
                        </Link>
                    </div>

                    <p className="mb-2">Divisa preferencial</p>

                    <select className="form-select mb-2" aria-label="Default select example" disabled>
                        {
                            itemsCurrencies.map((item, index) => {
                                return (
                                    <option value={index} key={index}>{item}</option>
                                )
                            })
                        }
                    </select>
                    {/*<div className="d-flex justify-content-end">
                        <button className="btn btn-primary mt-2">Enviar</button>
                    </div>*/}

                    <h5 className="pt-2">Dinero en caja registradora</h5>
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Divisa</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data[0].currencies.map((curreny, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="w-25">{curreny.name}</td>
                                            <td className="w-25">{curreny.money}</td>
                                        </tr>
                                    )
                                })
                            }

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
                            {
                                props.data[0].conversion.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="w-25">{item.from_name}</td>
                                            <td className="w-25">{item.to_name}</td>
                                            <td className="w-25">{`1 = 1 ${item.operation} ${item.number}`}</td>
                                        </tr>
                                    )
                                })
                            }
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
                                        {
                                            props.data[0].currencies.map((curreny, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="w-25">{curreny.name}</td>
                                                        <td className="w-25">{curreny.state}</td>
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

            </div>
        </div>
    )
}

export default CurrenciesBody;
