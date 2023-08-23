const mongoose = require('mongoose');

const Movie = require('../models/movie');
const NotFound = require('../utils/errors/not-found');
const BadRequest = require('../utils/errors/bad-request');
const Forbidden = require('../utils/errors/no-access');
// GET /movies возвращает все сохранённые текущим пользователем фильмы
function getMovies(req, res, next) {
  const id = req.user._id;
  Movie.find({ owner: id })
    .then(movies => res.send(movies))
    .catch(next);
}
// POST /movies создаёт фильм
function postMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN
  })
    .then(movie => res.status(201).send(movie))
    .catch(err => {
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
    });
}
// DELETE /movies/_id удаляет сохранённый фильм по id
async function deleteMovie(req, res, next) {
  const { id } = req.params;
  const owner = req.user._id;
  try {
    const movie = await Movie.findById(id).orFail();
    if (movie.owner.toString() !== owner) {
      throw new Forbidden(`Запрещено удалять фильмы чужих пользователей`);
    }
    movie.deleteOne();
    res.status(200).send({
      message: `Фильм id[${id}] удалён`
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequest(`Переданный id [${id}] фильма некорректный`));
      return;
    }
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFound(`Фильм id [${id}] не найден`));
      return;
    }
    next(err);
  }
}
module.exports = { getMovies, postMovie, deleteMovie };
