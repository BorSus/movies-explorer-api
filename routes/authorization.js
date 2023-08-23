const router = require('express').Router();
const { postNewUser, login, logout } = require('../controllers/user');
const { celebrateSchemaPostNewUser, celebrateSchemaLogin } = require('../middlewares/celebrate');
const { createUserLimit } = require('../middlewares/rateLimiter');
// POST /signup создаёт пользователя с переданными в теле:
/*
{
  "email": "TestUser@gmail.com",
  "password":"TestUser",
  "name": "TestUser"
     }
   */
router.post('/signup', createUserLimit, celebrateSchemaPostNewUser, postNewUser);
// POST /signin - проверка пользователя, получение JWT
router.post('/signin', celebrateSchemaLogin, login);
// GET /signout - выход пользователя, очитска JWT из cookies
router.get('/signout', logout);

module.exports = router;
