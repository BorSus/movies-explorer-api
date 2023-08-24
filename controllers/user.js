const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../utils/errors/not-found');
const BadRequest = require('../utils/errors/bad-request');
const NotUnique = require('../utils/errors/not-unique');
const Unauthorized = require('../utils/errors/unauthorized');
const { createToken } = require('../middlewares/authorization');
// POST /signup создаёт пользователя
async function postNewUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashPassword, name });
    res.status(201).send({
      name: user.name,
      email: user.email
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new NotUnique(`Пользователь с таким email уже зарегистрирован`));
      return;
    }
    if (err instanceof mongoose.Error.ValidationError) {
      next(
        new BadRequest(
          `${Object.values(err.errors)
            .map(error => error.message)
            .join(', ')}`
        )
      );
      return;
    }
    next(err);
  }
}
// POST /signin - проверка пользователя, получение JWT
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized(`Неправильный email или password`);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      throw new Unauthorized(`Неправильный email или password`);
    }
    const payload = { _id: user._id };
    const token = createToken(payload);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.status(200).send({
      message: `Пользователь ${email} авторизирован. JWT сохранен в cookie`
    });
  } catch (err) {
    next(err);
  }
}
// GET /signout - выход пользователя, очитска JWT из cookies
function logout(req, res) {
  res
    .clearCookie('jwt', { secure: true, sameSite: 'none' })
    .send({ message: 'Пользователь больше не авторизован,токен удален из cookies' });
}
// GET /users/me возвращает информацию о пользователе (email и имя)
async function getUsersMe(req, res, next) {
  const id = req.user._id;
  try {
    const user = await User.findById(id).orFail();
    res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequest(`Переданный id [${id}] пользователя некорректный`);
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      throw new NotFound(`Пользователь  ${id} не найден`);
    }
    next(err);
  }
}
// PATCH /users/me обновляет информацию о пользователе (email и имя)
function patchUserMe(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.code === 11000) {
        next(new NotUnique(`Пользователь с таким email уже зарегистрирован`));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequest(
            `${Object.values(err.errors)
              .map(error => error.message)
              .join(', ')}`
          )
        );
        return;
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound(`Пользователь не найден`));
        return;
      }
      next(err);
    });
}

module.exports = {
  postNewUser,
  login,
  logout,
  getUsersMe,
  patchUserMe
};
