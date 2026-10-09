function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong on the server.',
  });
}

module.exports = errorHandler;
