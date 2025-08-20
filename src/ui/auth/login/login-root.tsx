"use client";
import Image from "next/image";
import LoginForm from "./login-form";
import Footer from "@/ui/footer";
import Modal from "@/ui/templates/modal";
import { useState } from "react";
import LoginModalForgot from "./login-modal-forgot";
import LoginModalSuccess from "./login-modal-success";
import LoginContext from "./components/login-context";

const LoginRoot = () => {

  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("forgot");
  const [emailUser, setEmailUser] = useState("");

  const displayModal = () => {
    if (typeModal === "forgot") {
      return <LoginModalForgot />;
    }
    return <LoginModalSuccess />;
  };

  return (
    <LoginContext.Provider
      value={{ open, setOpen, setTypeModal, emailUser, setEmailUser }}
    >
      <div className="container pt-5">
        <div className="row h-100">
          <div className="col-0 col-md-5 p-4 mt-4">
            <Image
              className="img-thumbnail rounded shadow shadow-2 d-flex and align-items-center"
              aria-hidden
              src="/images/logo.jpeg"
              alt="Globe icon"
              width={500}
              height={500}
            />
          </div>
          <div className="col-1" />
          <div className="col-12 col-md-6 pe-4 border border-rounded rounded-3 p-4 bg-dark bg-gradient">
            <h2>Iniciar sesión</h2>
            <hr className="border border-black border-1 opacity-75" />
            <LoginForm />
          </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          {displayModal()}
        </Modal>

        <Footer />

      </div>
    </LoginContext.Provider>
  );
};

export default LoginRoot;
