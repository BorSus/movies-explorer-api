// Использование переменных окружения
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { controlErrors } = require('./middlewares/controlErrors'); // Централизованый обработчик ошибок
const { fullLimit } = require('./middlewares/rateLimiter'); // rate limiter число запросов с одного IP за 10мин ограничение 100.
const { originUrlCORS, PORT, DB_URL } = require('./config');

const app = express();
// модуль Helmet для установки заголовков, связанных с безопасностью.
app.use(helmet());
app.use(
  cors({
    origin: originUrlCORS,
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

//  Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Соединение с БД ==> ОК');
  })
  .catch(err => {
    console.log(`Соединение с БД ==> ОШИБКА: ${err}`);
  });

app.use(requestLogger);
// Подключение маршрутов. Все роуты подключены в файле index.js, который находится в папке routes.
app.use('/', fullLimit, require('./routes/index'));
// Подключение логгер ошибок
app.use(errorLogger);
// Подключение обработчик ошибок celebrate
app.use(errors());
// Подключение централизованный обработчик ошибок
app.use(controlErrors);
// Порт приложения
app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
