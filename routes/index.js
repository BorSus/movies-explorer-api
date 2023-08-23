const router = require('express').Router();
const { checkAuthorization } = require('../middlewares/authorization');
const NotFound = require('../utils/errors/not-found');
router.use('/', require('./authorization'));

router.use(checkAuthorization);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/*', (req, res, next) => {
  next(new NotFound(`данные в URL указаны неправильно или не существуют`));
});
module.exports = router;
