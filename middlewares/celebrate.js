const { celebrate, Joi } = require('celebrate');

const regexURL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// Authorization
//  POST /signup
const celebrateSchemaPostNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});
// POST /signin
const celebrateSchemaLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});

// Users
// GET /users/me
const celebrateSchemaGetUserMe = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string()
    //.hex().length(24).required()
  })
});
// PATCH /users/me
const celebrateSchemaPatchUserMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required()
  })
});
// Movies
// GET /movies
const celebrateSchemaGetMovies = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string()
  })
});
// POST /movies
const celebrateSchemaPostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexURL).required(),
    trailerLink: Joi.string().regex(regexURL).required(),
    thumbnail: Joi.string().regex(regexURL).required(),
    thumbnail: Joi.string().regex(regexURL).required(),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required()
  })
});

// DELETE /movies/_id
const celebrateSchemaDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
module.exports = {
  celebrateSchemaPostNewUser,
  celebrateSchemaLogin,
  celebrateSchemaGetUserMe,
  celebrateSchemaPatchUserMe,
  celebrateSchemaGetMovies,
  celebrateSchemaPostMovie,
  celebrateSchemaDeleteMovie
};
