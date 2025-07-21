"use client";
import CashierContext from "@/context/cashier-context";
import { useContext, useEffect, useState } from "react";

type ItemPaymentProps = {
    addDiv: () => void,
    deleteDiv: () => void,
    isLast: boolean,
    indexDiv: number
    updateValueInput: (props: {
        id: number;
        money: string;
    }) => void
}


const ItemPayment = (props: ItemPaymentProps) => {

    const { exchanges, setPaidMoney, paidMoney } = useContext(CashierContext);

    return (
        <div className="d-flex justify-content-between mb-2">
            <p className="fw-bold fs-6">A pagar:
            </p>
            <div className="w-50 d-flex gap-1">
                <select onChange={(e) => console.log/*setCurrency(e.target.value)*/} className="form-select form-select-sm" aria-label="Small select example">
                    {
                        exchanges.map((exchange, index) => {
                            return (
                                <option key={index} value={exchange.name}>{exchange.name}</option>
                            )
                        })
                    }
                </select>
                <input type="text" onChange={(e) => props.updateValueInput({ id: props.indexDiv, money: e.target.value })} className="form-control form-control-sm text-end" defaultValue="0" />

                {
                    props.isLast
                        ?
                        <button className="btn btn-success btn-sm" onClick={() => props.addDiv()}>
                            +
                        </button>
                        :

                        <button className="btn btn-danger btn-sm" onClick={() => props.deleteDiv()}>
                            -
                        </button>
                }
            </div>
        </div>
    )
}

export default ItemPayment;