const validation = () => {
  const patternEmail = () => {
    const regexEmail: RegExp = new RegExp(
      /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i
    );
    return regexEmail;
  };

  const patternText = () => {
    const regexEmail: RegExp = new RegExp(/^[a-zA-Z-ZÀ-ÿ0-9._ ]+$/i);
    return regexEmail;
  };

  return {
    patternEmail,
    patternText,
  };
};

export default validation;
