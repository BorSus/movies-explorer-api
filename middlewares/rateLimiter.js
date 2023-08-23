const rateLimit = require('express-rate-limit');

const fullLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут
  max: 100, // не больше 100 запросов за 10 минут
  message: {
    message: 'Слишком много запросов в течение 10 минут. Попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const createUserLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 10, // не больше 10 запросов за 1 час
  message: {
    message: 'Слишком много запросов на создание пользователя. Попробуйте позже.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  fullLimit,
  createUserLimit
};
