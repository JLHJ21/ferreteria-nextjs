import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const LoginModalSuccess = () => {
  return (
    <div className="grid gap-10 p-6">
      <div className="grid gap-6 h-[13.5rem]">
        <div className="flex justify-center items-center h-[4.5rem]">
          <CheckCircleIcon />
        </div>
        <div className="grid gap-2 text-center">
          <p className="font-medium text-2xl leading-7 text-gray-light">
            You have change your password successfully
          </p>
          <p className="font-normal text-base leading-5 text-gray-light text-center">
            Now you can access to the app without any problemas, but please save
            your password next time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModalSuccess;
