import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ErrorsProcess from "@/ui/errors-handling/errors-process";
import { sendCode } from "@/actions/register/action-register";

type propsRegister = {
  dataUser: {
    name: string;
    email: string;
  };
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
    <div className="grid gap-10 p-6">
      <div className="grid gap-6 h-[13.5rem]">
        <div className="flex justify-center items-center h-[4.5rem]">
          <CheckCircleIcon />
        </div>
        <div className="grid gap-2 text-center">
          <p className="font-medium text-2xl leading-7 text-gray-light">
            Create account
          </p>
          <p className="font-normal text-base leading-5 text-gray-light text-center">
            Confirm your email using the link we sent to {props.dataUser.email}{" "}
            to continue.
          </p>
        </div>
      </div>
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
    </div>
  );
};

export default RegisterModal;
