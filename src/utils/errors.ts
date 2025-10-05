export const ErrorsGroup = () => {
  const errorsResponse = [
    { errorCode: 300, message: "multiples choices in backend" },
    { errorCode: 301, message: "moved permanently the page to other place" },
    { errorCode: 302, message: "found but no in the place that you asked" },
    { errorCode: 400, message: "something is wrong about what you asked" },
    //{ errorCode: 401, message: "you need to indentify yourself before" },
    { errorCode: 403, message: "you are not allowed to this" },
    { errorCode: 404, message: "page not found" },
    { errorCode: 406, message: "data not acceptable" },
    { errorCode: 500, message: "connection error" },
    { errorCode: 501, message: "that request is not support right now" },
    { errorCode: 503, message: "service unavailable in the moment" },
  ];

  return errorsResponse;
};
