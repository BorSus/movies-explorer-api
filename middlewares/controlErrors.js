class BadRequest extends Error {
  constructor(message) {
    super(`Произошла ошибка:Bad Request («неправильный, некорректный запрос»)==> ${message}`);
    this.statusCode = 400;
  }
}
class Unauthorized extends Error {
  constructor(message) {
    super(`Произошла ошибка: Unauthorized («не авторизован»)==> ${message}`);
    this.statusCode = 401;
  }
}
class Forbidden extends Error {
  constructor(message) {
    super(`Произошла ошибка: Forbidden («запрещено»)==> ${message}`);
    this.statusCode = 403;
  }
}
class NotFound extends Error {
  constructor(message) {
    super(`Произошла ошибка: Not Found («не найдено»)==> ${message}`);
    this.statusCode = 404;
  }
}
class NotUnique extends Error {
  constructor(message) {
    super(`Произошла ошибка:Conflict («конфликт»)==> ${message}`);
    this.statusCode = 409;
  }
}
function controlErrors(err, req, res, next) {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? `Произошла ошибка: Server Error (ошибка сервера)` : message
  });
  next();
}

module.exports = { controlErrors, BadRequest, Forbidden, Unauthorized, NotFound, NotUnique };
