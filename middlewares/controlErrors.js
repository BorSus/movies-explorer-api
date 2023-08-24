function controlErrors(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? `Произошла ошибка: Server Error (ошибка сервера)` : message
  });
  next();
}

module.exports = { controlErrors };
