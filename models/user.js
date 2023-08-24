const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    // email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
    email: {
      type: String,
      validate: {
        validator: v => validator.isEmail(v),
        message: 'Некорректный Email'
      },
      required: [true, 'Поле "email" не может быть пустым'],
      unique: true
    },
    // password — **хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
    password: {
      type: String,
      required: [true, 'Поле "password" не может быть пустым'],
      select: false
    },
    // name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.
    name: {
      type: String,
      required: [true, 'Поле "password" не может быть пустым'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30']
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
