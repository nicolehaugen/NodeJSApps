var express = require('express');
var router = express.Router();
var offers = require('../controllers/offer.server.controller');

router.get('/', offers.list);

router.post('/', offers.create);

module.exports = router;