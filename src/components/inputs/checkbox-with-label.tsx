type CheckboxWithLabelProps = {
  className: string;
  text: string;
  id: string;
};
const CheckboxWithLabel = ({ className, text, id }: CheckboxWithLabelProps) => {
  return (
    <div className={className}>
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
      <input
        className="form-check-input form-check-input-lg me-2"
        name={id}
        type="checkbox"
        value=""
        id={id}
      />
    </div>
  );
};

export default CheckboxWithLabel;
