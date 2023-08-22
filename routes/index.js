const router = require('express').Router();
const { checkAuthorization } = require('../middlewares/authorization');
router.use('/', require('./authorization'));

router.use(checkAuthorization);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));
module.exports = router;
