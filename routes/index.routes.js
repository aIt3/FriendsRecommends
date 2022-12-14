const Post = require("../models/Post.model");

const router = require("express").Router();

/* GET home page */


router.get('/', (req, res, next) => {
  
  Post.find()
  .populate({path:'postedByUser', model:'User'})
  .then(postsFromDB => {
    res.render('index', {posts: postsFromDB, userInSession: req.session.currentUser});
  })


});



// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));


// POST route ==> to process form data

// get the click data from the database
router.post('/clicked/:postId/thumbsUp', (req, res) => {
  console.log(req.params.postId)
  Post.findByIdAndUpdate(req.params.postId,{$inc: {thumbsUp: 1}},{new:true}).then(updated=>{console.log(updated)})
 
  
});

router.post('/clicked/:postId/thumbsDown', (req, res) => {
  console.log(req.params.postId)
  Post.findByIdAndUpdate(req.params.postId,{$inc: {thumbsDown: 1}},{new:true}).then(updated=>{console.log(updated)})
 
  
});



module.exports = router;
