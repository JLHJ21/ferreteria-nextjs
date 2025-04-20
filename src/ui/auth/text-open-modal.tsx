const TextOpenModal = () => {
  return (
    <p
      className="text-end text-decoration-underline cursor-pointer"
      data-bs-toggle="modal"
      data-bs-target={`#recoverPasswordModal`}
    >
      ¿Olvidaste tu contraseña?
    </p>
  );
};
export default TextOpenModal;
