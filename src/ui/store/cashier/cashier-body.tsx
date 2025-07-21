"use client";

import CashierContext from "@/context/cashier-context";
import Payments from "./payments";
import { useState } from "react";
import PaidByClient from "./paid-by-client";


type CashierBodyProps = {
    exchanges: { name: string; conversion: string }[];
    data: { id: number; product: string; amount: number; price: string }[];
}

const CashierBody = (props: CashierBodyProps) => {
    const labelsTitle = ["#", "Producto", "Cantidad", "Precio", "Opciones"];
    const [paidMoney, setPaidMoney] = useState([{ id: 1, money: "0", currency: "USD" }])

    return (
        <CashierContext.Provider value={{ exchanges: props.exchanges, setPaidMoney: setPaidMoney, paidMoney: paidMoney }}>
            <div className="container ">
                <div className="row h-100 px-5 py-3">
                    <div className="col-8 pb-2 border table-responsive">
                        <p className="fs-5 fw-bold mt-3">Carrito de compras</p>

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

                            <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>

                        </div>

                        <hr className="my-3" />
                        <p className="fs-5 fw-bold">Productos disponibles</p>

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

                            <nav className="d-flex justify-content-center" aria-label="Page navigation example">
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
                    <div className="col-4 gap-3 d-flex flex-column border py-3">
                        <div>
                            <label htmlFor="nameId" className="form-label fs-6">Nombre del cliente</label>
                            <input type="text" className="form-control form-control-sm" id="nameId" placeholder="John Doe" />
                        </div>
                        <div>
                            <label htmlFor="clientId" className="form-label">Cédula del cliente</label>
                            <input type="text" className="form-control form-control-sm" id="clientId" placeholder="00000000" />
                        </div>

                        <Payments />

                        <div>

                            <div className="d-flex justify-content-between">
                                <p className="fw-bold fs-6 mb-0">
                                    Total a pagar:
                                </p>
                                <p className="mb-0">37$</p>
                            </div>

                            <PaidByClient paidMoney={paidMoney} />

                            <hr />

                            <div className="d-flex justify-content-between">
                                <p className="fw-bold fs-6 mb-0">
                                    Total:
                                </p>
                                <p className="mb-0">0$</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-sm px-5">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CashierContext.Provider>
    )
}

export default CashierBody;
