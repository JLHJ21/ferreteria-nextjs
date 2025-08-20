// biome-ignore lint/style/useImportType: <explanation>
import React, { createContext, Dispatch } from "react";

export type CustomizationProps = {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    setTypeModal: Dispatch<React.SetStateAction<string>>;
    emailUser: string;
    setEmailUser: Dispatch<React.SetStateAction<string>>;
};

const initialState: CustomizationProps = {
    open: false,
    setOpen: () => { },
    setTypeModal: () => "forgot",
    emailUser: "",
    setEmailUser: () => "",
};
const LoginContext = createContext(initialState);

export default LoginContext;
