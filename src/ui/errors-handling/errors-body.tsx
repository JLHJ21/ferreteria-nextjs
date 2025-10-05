import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

type propsErrors = {
  errorTitle: string;
  messageError: string;
};

const ErrorsBody = ({ errorTitle, messageError }: propsErrors) => {
  return (
    <div className="grid gap-10 p-6">
      <div className="grid gap-1 h-[10rem]">
        <div className="flex justify-center items-center h-auto">
          <XCircleIcon />
        </div>
        <div className="grid gap-2 text-center">
          <p className="font-medium text-2xl leading-7 text-gray-light">
            {errorTitle}
          </p>
          <p className="font-normal text-base leading-5 text-gray-light text-center">
            {messageError}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorsBody;
