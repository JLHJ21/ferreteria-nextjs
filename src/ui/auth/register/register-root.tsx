import Image from "next/image";
import RegisterForm from "./register-form";
import Footer from "@/ui/footer";

const RegisterRoot = () => {
  return (
    <div className="container pt-5">
      <div className="row h-100">
        <div className="col-0 col-md-5 p-4 mt-4" id="divImagen">
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
          <h2>Registrar cuenta</h2>

          <hr className="border border-black border-1 opacity-75" />
          <RegisterForm />
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default RegisterRoot;
