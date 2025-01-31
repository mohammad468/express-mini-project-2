const unexpectedError = (err, req, res, next) => {
  const status = err.status ? err.status : err.statusCode ? err.statusCode : 500;

  const unexpectedErrorResponse = {
    statusCode: status,
    errorCode: "err-500",
    errorDescription: err.message ? err.message : "unexpected error",
  };

  return res.status(status).json(unexpectedErrorResponse);
};

module.exports = { unexpectedError };
