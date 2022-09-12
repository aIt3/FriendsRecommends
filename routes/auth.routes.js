// routes/auth.routes.js
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const saltRounds = 10;
const { Router } = require('express');
const router = new Router();
 
// GET route ==> to display the signup form to users

// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;

    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({  
          username,
          email,
          passwordHash: hashedPassword
        });
      })
      .then(userFromDB => {
        //console.log('Newly created user is: ', userFromDB);
        res.redirect('/');
      })
      .catch(error => next(error));
  
  });
module.exports = router;