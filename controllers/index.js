//this file will import all of the routes and package them up for us
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

module.exports = router;