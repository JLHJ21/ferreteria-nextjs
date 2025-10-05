"use client";
import { useState } from "react";
import ErrorsContext from "./errors-context";
import ErrorsModal from "./errors-body";
import Modal from "../templates/modal";

const CallErrorsModal = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [openError, setOpenError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [messageError, setMessageError] = useState("");

  return (
    <ErrorsContext.Provider
      value={{ openError, setOpenError, setErrorTitle, setMessageError }}
    >
      {children}
      <Modal open={openError} onClose={() => setOpenError(false)}>
        <ErrorsModal errorTitle={errorTitle} messageError={messageError} />
      </Modal>
    </ErrorsContext.Provider>
  );
};

export default CallErrorsModal;
