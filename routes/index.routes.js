const Post = require("../models/Post.model");

const router = require("express").Router();

/* GET home page */


router.get('/', (req, res, next) => {
  
  Post.find()
  .populate({path:'postedByUser', model:'User'})
  .then(postsFromDB => {
  console.log(req.session.currentUser, postsFromDB[0].postedByUser)
    res.render('index', {posts: postsFromDB, userInSession: req.session.currentUser});
  })


});



// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));


// POST route ==> to process form data

module.exports = router;
