"use client";
import { createContext, SetStateAction } from "react";

export type CustomizationProps = {
    exchanges: { name: string; conversion: string }[];
    setPaidMoney: React.Dispatch<SetStateAction<{
        id: number;
        money: string;
        currency: string;
    }[]>>
    paidMoney: { id: number; money: string; currency: string }[];
};

const initialState: CustomizationProps = {
    exchanges: [
        {
            name: "",
            conversion: ""
        }
    ],
    setPaidMoney: () => { },
    paidMoney: [
        { id: 1, money: "0", currency: "USD" }
    ]
};
const CashierContext = createContext(initialState);

export default CashierContext;
