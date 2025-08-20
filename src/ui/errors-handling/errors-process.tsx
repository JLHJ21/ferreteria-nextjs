"use client";
import ErrorsContext from "./errors-context";
import { errorsGroup } from "../../_utils/errors";
import { useContext } from "react";

type propsErrors = {
  error: number;
  message: string;
};

type propsCheck = {
  errorCheck: number;
};

const ErrorsProcess = () => {
  const { setOpenError, setErrorTitle, setMessageError } =
    useContext(ErrorsContext);
  const errors = errorsGroup();

  const checkError = (props: propsCheck) => {
    let actualError = "";
    for (let index = 0; index < errors.length; index++) {
      const element = errors[index];
      if (element.errorCode === props.errorCheck) {
        actualError = element.message;
        return actualError;
      }
    }
    return actualError;
  };

  const callsModal = (props: propsErrors) => {
    setOpenError(true);
    setErrorTitle(checkError({ errorCheck: props.error }));
    setMessageError(props.message);
  };

  return { callsModal };
};

export default ErrorsProcess;
