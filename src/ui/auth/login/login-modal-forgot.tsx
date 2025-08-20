import React, { useState } from "react";
import RequiredEmail from "./components/required-email";
import CodeEmail from "./components/code-email";
import RequiredPassword from "./components/required-password";

const LoginModalForgot = () => {
  const [passEmail, setPassEmail] = useState(false);
  const [change, setChange] = useState(false);

  return (
    <>
      <div className="grid gap-10 p-6">
        <div className="grid gap-5">
          <div className="grid gap-2 text-center">
            <p className="font-medium text-2xl leading-7 text-gray-light">
              Recover password
            </p>
          </div>
          <RequiredEmail passEmail={passEmail} setPassEmail={setPassEmail} />
          {passEmail && <CodeEmail change={change} setChange={setChange} />}
          {passEmail && change && <RequiredPassword />}
        </div>
      </div>
    </>
  );
};

export default LoginModalForgot;
