const notFound = (req, res, next) => {
  const notFoundResponse = {
    statusCode: 404,
    errorCode: "err-404",
    errorDescription: "not found page",
  };

  return res.status(404).json(notFoundResponse);
};

module.exports = { notFound };
