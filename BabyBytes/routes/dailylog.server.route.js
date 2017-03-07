var express = require('express');
var router = express.Router();
var dailyLogs = require('../controllers/dailylog.server.controller');

router.get('/', dailyLogs.list);

//router.post('/', dailyLogs.create);

module.exports = router;