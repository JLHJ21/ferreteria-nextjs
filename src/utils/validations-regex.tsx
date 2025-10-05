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

  const patternNumber = () => {
    const regexNumber: RegExp = /^(\d{1,3}(,\d{3})*|\d+)(\,.\d{0,6})?$/i;
    return regexNumber;
  };



  return {
    patternEmail,
    patternText,
    patternNumber
  };
};

export default validation;
