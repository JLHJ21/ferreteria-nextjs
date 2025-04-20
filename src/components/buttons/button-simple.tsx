type AllowedStrings = "button" | "submit" | "reset";

type ButtonSimpleProps = {
  buttonType: AllowedStrings;
  className: string;
  text: string;
};

const ButtonSimple = ({ buttonType, className, text }: ButtonSimpleProps) => {
  //"btn btn-primary w-100"
  return (
    <button type={buttonType} className={className}>
      {text}
    </button>
  );
};

export default ButtonSimple;
