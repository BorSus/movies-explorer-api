const jwt = require('jsonwebtoken');

const { Unauthorized } = require('./controlErrors');

const { secretKey } = require('../config');

function createToken(payload) {
  return jwt.sign(payload, secretKey, {
    expiresIn: '7d'
  });
}
function checkToken(token) {
  return jwt.verify(token, secretKey);
}

function checkAuthorization(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorized(`JWT из cookies не получен`));
  }

  try {
    const payload = checkToken(token);
    req.user = payload;
  } catch (_) {
    return next(new Unauthorized(`Токен не прошел проверку`));
  }

  return next();
}

module.exports = { createToken, checkToken, checkAuthorization };
