const TextErrors = ({ errorMessage }: { errorMessage: string }) => {
  return (
    errorMessage !== "" && (
      <h5 className="text-danger text-center pb-3 mt-1">{errorMessage}</h5>
    )
  );
};

export default TextErrors;
