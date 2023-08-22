const router = require('express').Router();

const { getMovies, postMovie, deleteMovie } = require('../controllers/movie');
const {
  celebrateSchemaGetMovies,
  celebrateSchemaPostMovie,
  celebrateSchemaDeleteMovie
} = require('../middlewares/celebrate');
// GET /movies возвращает все сохранённые текущим пользователем фильмы
router.get('/', celebrateSchemaGetMovies, getMovies);
// POST /movies создаёт фильм с переданными в теле:
/*
  {
  "country": "Страна",
  "director":"Режиссёр",
  "duration": "120",
  "year": "2020",
  "description": "описание фильма",
  "image": "https://filmposter.com/example.jpeg",
  "trailerLink": "https://filmtrailer.com/example.avi",
  "nameRU": "название фильма на русском языке",
  "nameEN": "название фильма на английском языке",
  "thumbnail": "https://filmposter.com/examplesmall.jpeg",
  "movieId": "123456789",
   }
   */
router.post('/', celebrateSchemaPostMovie, postMovie);
// DELETE /movies/_id удаляет сохранённый фильм по id
router.delete('/:id', celebrateSchemaDeleteMovie, deleteMovie);

module.exports = router;
