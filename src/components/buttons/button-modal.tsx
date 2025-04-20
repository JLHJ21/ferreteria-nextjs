type ButtonSimpleProps = {
  className: string;
  text: string;
  target: string;
};

const ButtonModal = ({ className, text, target }: ButtonSimpleProps) => {
  return (
    <button
      type="button"
      className={className}
      data-bs-toggle="modal"
      data-bs-target={`#${target}`}
    >
      {text}
    </button>
  );
};

export default ButtonModal;
