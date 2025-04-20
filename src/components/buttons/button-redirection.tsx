type ButtonSimpleProps = {
  className: string;
  text: string;
  direction: string;
};

const ButtonRedirection = ({
  className,
  text,
  direction,
}: ButtonSimpleProps) => {
  return (
    <a href={direction} className={className}>
      {text}
    </a>
  );
};

export default ButtonRedirection;
