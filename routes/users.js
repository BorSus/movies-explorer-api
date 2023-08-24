const router = require('express').Router();
const { getUsersMe, patchUserMe } = require('../controllers/user');
const { celebrateSchemaPatchUserMe } = require('../middlewares/celebrate');
// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);
// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrateSchemaPatchUserMe, patchUserMe);

module.exports = router;
