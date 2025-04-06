import Image from "next/image";

const SignInRoot = () => {
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
          <h2>Registrar cuenta</h2>

          <hr className="border border-black border-1 opacity-75" />

          <h5
            className="text-danger text-center pb-3 mt-1"
            id="error_global"
          ></h5>

          <form
            action="pagina/registrar"
            id="formulario_registrar"
            className="needs-validation"
            noValidate
          >
            {" "}
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
                  className="form-control input-todo"
                  placeholder="Nombre de usuario"
                  required
                />

                {/*VALIDACION*/}
                <div className="invalid-feedback">
                  Escriba su nombre de usuario.
                </div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-usuario_cuenta"
                ></div>
              </div>
            </div>
            <div className="col-12 pt-3">
              <label htmlFor="nombre_cuenta" className="form-label mb-1">
                Nombres personales
              </label>

              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  name="nombre_cuenta"
                  id="nombre_cuenta"
                  type="text"
                  className="form-control input-texto"
                  placeholder="Marco Polo Lan Ruiz"
                  required
                />

                {/*VALIDACION*/}
                <div className="invalid-feedback">
                  Escriba sus nombres personales
                </div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-nombre_cuenta"
                ></div>
              </div>
            </div>
            <div className="col-12 pt-3">
              <label htmlFor="correo_cuenta" className="form-label mb-1">
                Correo electrónico
              </label>

              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  name="correo_cuenta"
                  id="correo_cuenta"
                  type="email"
                  className="form-control input-todo"
                  placeholder="marco@gmail.com"
                  required
                />

                {/*VALIDACION*/}
                <div className="invalid-feedback">
                  Escriba su correo electrónico
                </div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-correo_cuenta"
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
                  className="form-control input-todo"
                  placeholder="********"
                  required
                />

                {/*VALIDACION*/}
                <div className="invalid-feedback">Escriba su contraseña</div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-contrasenna_cuenta"
                ></div>
              </div>
            </div>
            <div className="col-12 pt-3">
              <label htmlFor="repetir_cuenta" className="form-label mb-1">
                Repetir contraseña
              </label>

              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  name="repetir_cuenta"
                  id="repetir_cuenta"
                  type="password"
                  className="form-control input-todo"
                  placeholder="********"
                  required
                />

                <div className="invalid-feedback">
                  Escriba la contraseña anteriormente escrita
                </div>

                {/* Error Personalizado */}
                <div
                  className="personalizado-invalid-feedback"
                  id="error-repetir_cuenta"
                ></div>
              </div>
            </div>
            <div className="pt-4">
              <button type="submit" className="btn btn-primary w-100">
                Crear cuenta
              </button>
            </div>
            <div className="row text-center pt-3">
              <p className="text-center pb-0 mb-2">
                ¿Olvidaste tu contraseña? ó ¿Ya tienes Cuenta?
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
                  href="/ferreteria/"
                  type="button"
                  className="btn btn-sm  btn-success text-truncate"
                >
                  Iniciar sesión
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInRoot;
