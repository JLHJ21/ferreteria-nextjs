import Image from "next/image";

const LoginRoot = () => {
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
        <div className="col-1"></div>
        <div className="col-12 col-md-6 pe-4 border border-rounded rounded-3 p-4 bg-dark bg-gradient">
          <h2>Iniciar sesión</h2>

          <hr className="border border-black border-1 opacity-75" />

          <h5
            className="text-danger text-center pb-3 mt-1"
            id="error_global"
          ></h5>

          <form
            id="formulario_ingresar"
            className="needs-validation"
            noValidate
          >
            {/*method="POST"*/}

            <div className="col-12">
              <label htmlFor="usuario_cuenta" className="form-label mb-1">
                Nombre de usuario
              </label>

              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  name="usuario_cuenta"
                  id="usuario_cuenta"
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  required
                />

                {/* VALIDACION */}
                <div className="invalid-feedback">
                  Escribe el nombre de usuario
                </div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-usuario_cuenta"
                ></div>
              </div>
            </div>

            <div className="col-12 pt-3">
              <label htmlFor="contrasenna_cuenta" className="form-label mb-1">
                Contraseña
              </label>

              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  name="contrasenna_cuenta"
                  id="contrasenna_cuenta"
                  type="password"
                  className="form-control"
                  placeholder="Contraseña de usuario"
                  required
                />

                {/* VALIDACION */}
                <div className="invalid-feedback">Escribe la contraseña</div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-contrasenna_cuenta"
                ></div>
              </div>
            </div>

            <div className="row pt-2">
              <div className="container d-flex justify-content-center ">
                <div className="form-check form-check-lg mb-0 pt-2">
                  <input
                    className="form-check-input form-check-input-lg me-2"
                    name="recordar"
                    type="checkbox"
                    value=""
                    id="recordar"
                  />
                  <label className="form-check-label" htmlFor="recordar">
                    Recordarme
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button type="submit" className="btn btn-primary w-100">
                Ingresar cuenta
              </button>
            </div>

            <div className="row text-center pt-3">
              <p className="text-center pb-0 mb-2">
                ¿Olvidaste tu contraseña? ó ¿No tienes Cuenta?
              </p>

              <div className="col-12 col-md-5 offset-0 offset-md-1 text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-danger text-white text-truncate"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_recuperar_cuenta"
                >
                  Recuperar cuenta
                </button>
              </div>

              <div className="col-12 col-md-5 pt-3 pt-md-0">
                <a
                  href="pagina/registrar"
                  type="button"
                  className="btn btn-sm  btn-success text-truncate"
                >
                  Crear cuenta
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRoot;
