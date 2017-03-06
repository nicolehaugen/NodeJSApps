var express = require('express');
var router = express.Router();
var babies = require('../controllers/baby.server.controller');
var users = require('../controllers/user.server.controller');

//Get all babies belonging to current user - return as either template view or json
router.get('/view', users.requiresLogin, babies.listView);
router.get('/json', users.requiresLogin, babies.listJson);

//Find baby by id belonging to current user - return as either template view or json
router.get('/view/:id/', users.requiresLogin, babies.findByIdView);
router.get('/json/:id/', users.requiresLogin, babies.findByIdJson);

router.post('/', users.requiresLogin, babies.create);
router.put('/:id/', users.requiresLogin, babies.findById, babies.addLogJson);

module.exports = router;