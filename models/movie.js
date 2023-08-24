const mongoose = require('mongoose');

const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    //  country — страна создания фильма. Обязательное поле-строка.
    country: {
      type: String,
      required: [true, 'Поле "country" обезательно']
    },
    //  director — режиссёр фильма. Обязательное поле-строка.
    director: {
      type: String,
      required: [true, 'Поле "director" обезательно']
    },
    // duration — длительность фильма. Обязательное поле-число.
    duration: {
      type: Number,
      required: [true, 'Поле "duration" обезательно']
    },
    // year — год выпуска фильма. Обязательное поле-строка.
    year: {
      type: String,
      required: [true, 'Поле "year" обезательно']
    },
    // description — описание фильма. Обязательное поле-строка.
    description: {
      type: String,
      required: [true, 'Поле "description" обезательно']
    },
    // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом
    image: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      required: [true, 'Поле "image" обезательно']
    },
    // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    trailerLink: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      required: [true, 'Поле "trailerLink" обезательно']
    },
    // thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    thumbnail: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      required: [true, 'Поле "thumbnail" обезательно']
    },
    //  owner — _id пользователя, который сохранил фильм. Обязательное поле.
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле в формате number.
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" обезательно']
    },
    // nameRU — название фильма на русском языке. Обязательное поле-строка.
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" обезательно']
    },
    // nameEN — название фильма на английском языке. Обязательное поле-строка.
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" обезательно']
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('movie', movieSchema);
