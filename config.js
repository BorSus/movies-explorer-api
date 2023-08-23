// Файл конфигурации

// Окружение
const { NODE_ENV, JWT_SECRET } = process.env;

// Выбор ключа в зависимости от окружения
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'development-secret-key';

// массив URL для CORS
const originUrlCORS = [
  'http://localhost:3001',
  'http://kinopoisk.sustavov.nomoredomainsicu.ru',
  'https://kinopoisk.sustavov.nomoredomainsicu.ru'
];

// Порт и БД
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = { secretKey, originUrlCORS, PORT, DB_URL };
