import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import { sendCode } from "@/actions/register/action-register";
type propsRegister = {
  dataUser: {
    name: string;
    email: string;
  };

  open: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

const RegisterModal = (props: propsRegister) => {
  const { callsModal } = ErrorsProcess();
  const [seconds, setSeconds] = useState(60);

  const reSendCode = async (name: string, email: string) => {
    setSeconds(60);
    const result = await sendCode(name, email);
    if (result.ok === true) {
      alert("code resend to your email");
      console.log("successfully");
    } else {
      callsModal({ error: result.code, message: result.result });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Modal.Body className="pt-0 text-center">
        <h5 className="fw-bold">
          Create account
        </h5>
        <p>
          Confirm your email using the link we sent to {props.dataUser.email}{" "}
          to continue.
        </p>

        <div className="grid gap-4">
          <div className="flex gap-[0.625rem] items-center h-5">
            <div className="flex-grow border-t border-gray-light-2 border" />
            <span className="flex-shrink h-5 text-gray-light font-normal text-sm truncate">
              Didn’t receive the email?
            </span>
            <div className="flex-grow border-t border-gray-light-2 border" />
          </div>
          {seconds <= 0 ? (
            <button
              type="button"
              onClick={() =>
                reSendCode(props.dataUser.name, props.dataUser.email)
              }
              className="h-[2.75rem] rounded p-3 grid gap-[0.625rem] hover:bg-black hover:border-black group-hover:text-white justify-center group"
              data-button="buttonReSend"
            >
              <span className="text-black group-hover:text-white font-medium text-base leading-5 w-full truncate h-5">
                Resend
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="h-[2.75rem] rounded p-3 grid gap-[0.625rem] hover:bg-black hover:border-black group-hover:text-white justify-center group"
              data-button="button"
            >
              <span className="text-black group-hover:text-white font-medium text-base leading-5 w-full truncate h-5">
                {seconds}
              </span>
            </button>
          )}
        </div>

      </Modal.Body>

      <Modal.Footer className="flex-nowrap p-0 text-white">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => !props.open}
          className="col-6 fs-6 text-decoration-none py-3 m-0 rounded-0 border-end"
        >
          No
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RegisterModal;
