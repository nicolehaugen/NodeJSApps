var users = require('../controllers/user.server.controller'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', users.renderSignup);
router.post('/signup', users.signup);

router.get('/signin', users.renderSignin );
router.post('/signin', passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/signin',
       failureFlash: true
     }));

router.get('/signout', users.signout);

module.exports = router;