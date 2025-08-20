"use client";
import { createContext } from "react";

type propsErrors = {
  openError: boolean;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;

  setErrorTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
};

const initialState: propsErrors = {
  openError: false,
  setOpenError: () => {},
  setErrorTitle: () => {},
  setMessageError: () => {},
};
const ErrorsContext = createContext(initialState);

export default ErrorsContext;
