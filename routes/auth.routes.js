// routes/auth.routes.js
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const saltRounds = 10;
const { Router } = require('express');
const router = new Router();
 
//// R E G I S T R A T I O N 
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
//// L O G I N 

router.get('/userProfile', (req, res) => {
    res.render('users/user-profile', { userInSession: req.session.currentUser });
  
  });

router.post('/login', (req, res, next) => {
    console.log('SESSION =====> ', req.session);
        const { email, password } = req.body;
        if (email === '' || password === '') {
          res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
          });
          return;
        }
        User.findOne({ email })
        .then(user => {
          if (!user) {
            res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
            return;
          } else if (bcryptjs.compareSync(password, user.passwordHash)) {
            // when we introduce session, the following line gets replaced with what follows:
            // res.render('users/user-profile', { user });
     
            //******* SAVE THE USER IN THE SESSION ********//
            req.session.currentUser = user;
            res.redirect('/');
                  } else {
            res.render('auth/login', { errorMessage: 'Incorrect password.' });
          }
        })
        .catch(error => next(error));
    });

//// L O G O U T 

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  
  });
  
   
  
module.exports = router;