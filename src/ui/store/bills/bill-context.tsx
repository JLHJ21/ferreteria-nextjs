import React, { createContext, Dispatch } from "react";

export type CustomizationProps = {
    secondGraphic: { month: string, money: string }[];
    setSecondGraphic: Dispatch<React.SetStateAction<{ month: string, money: string }[]>>;
};

const initialState: CustomizationProps = {
    secondGraphic: [{ month: "", money: "" }],
    setSecondGraphic: () => "forgot",
};
const BillContext = createContext(initialState);

export default BillContext;
