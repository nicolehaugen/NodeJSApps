var express = require('express');
var router = express.Router();
var babies = require('../controllers/baby.server.controller');
var logs = require('../controllers/dailylog.server.controller');
var users = require('../controllers/user.server.controller');

//Get all babies belonging to current user - return as either template view or json
router.get('/view', users.requiresLogin, babies.listView);
router.get('/json', users.requiresLogin, babies.listJson);

//Find baby by id belonging to current user - return as either template view or json
router.get('/view/:babyid/', users.requiresLogin, babies.findByIdView);
router.get('/json/:babyid/', users.requiresLogin, babies.findByIdJson);

//Find log id
router.get('/view/:babyid/:logid', users.requiresLogin, babies.findByIdRes, logs.findByIdView);
router.get('/json/:babyid/:logid', users.requiresLogin, babies.findByIdRes, logs.findByIdJson);

router.post('/', users.requiresLogin, babies.createView);
router.put('/:babyid/', users.requiresLogin, babies.findByIdRes, logs.addLogView);

module.exports = router;