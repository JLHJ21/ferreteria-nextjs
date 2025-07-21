"use client";
import { useContext, useEffect, useState } from "react";
import ItemPayment from "./item-payment";
import CashierContext from "@/context/cashier-context";


const Payments = () => {
    const { setPaidMoney, paidMoney } = useContext(CashierContext);
    const [currency, setCurrency] = useState("USD");
    const [divs, setDivs] = useState<React.ReactElement[]>([]); // State to hold an array of div elements

    const addDiv = () => {
        // Add a new div to the array in the state
        setDivs(prevDivs => [
            ...prevDivs,
            <ItemPayment updateValueInput={updateValueInput} isLast={false} key={prevDivs.length} indexDiv={prevDivs.length} addDiv={addDiv} deleteDiv={deleteDiv} />
        ]);
    };

    const deleteDiv = () => {
        setDivs(divs.slice(0, -1));
        setPaidMoney(paidMoney.slice(0, -1));
    }

    useEffect(() => {
        addDiv()
    }, [])


    const updateValueInput = (props: { id: number, money: string }) => {
        const shadowCopy = [...paidMoney];
        const index = shadowCopy.findIndex(item => item.id === props.id);
        if (index === -1) {
            setPaidMoney(prevPaid => [
                ...prevPaid,
                {
                    id: props.id,
                    money: props.money,
                    currency: currency
                }
            ])
        } else {
            shadowCopy[index] = {
                ...shadowCopy[index],
                money: props.money,
            };
            setPaidMoney(shadowCopy)
        }
    }


    return (

        <div className="border bg-black rounded p-3 h-100 overflow-y-scroll mb-auto" style={{ maxHeight: "17rem" }}>
            {divs.map((div, index) => (
                <ItemPayment
                    key={index}
                    addDiv={addDiv}
                    deleteDiv={deleteDiv}
                    indexDiv={index + 1}
                    isLast={index === divs.length - 1}
                    updateValueInput={updateValueInput}
                />
            ))}
        </div>
    )
}

export default Payments;