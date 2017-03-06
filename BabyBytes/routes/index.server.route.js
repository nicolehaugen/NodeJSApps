var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baby Bytes', userFullName: req.user ? req.user.fullName : '' }
  );
});

module.exports = router;
