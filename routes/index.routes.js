const router = require("express").Router();

/* GET home page */


router.get('/', (req, res) => {
  res.render('index', { userInSession: req.session.currentUser });

});


// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));


// POST route ==> to process form data

module.exports = router;
