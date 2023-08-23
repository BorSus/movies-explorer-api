// Использование переменных окружения
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// Централизованый обработчик ошибок
const { controlErrors } = require('./middlewares/controlErrors');

const { originUrlCORS, PORT, DB_URL } = require('./config');

const app = express();
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
// Подключение маршрутов
app.use('/', require('./routes/index'));
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
