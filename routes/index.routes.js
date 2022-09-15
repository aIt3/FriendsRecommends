const Post = require("../models/Post.model");

const router = require("express").Router();

/* GET home page */


router.get('/', (req, res, next) => {
  
  Post.find()
  .populate({path:'postedByUser', model:'User'})
  .then(postsFromDB => {
  console.log(postsFromDB)
    res.render('index', {posts: postsFromDB, userInSession: req.session.currentUser});
  })


});



// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));


// POST route ==> to process form data

// get the click data from the database
router.post('/clicked/:postId', (req, res) => {
  console.log(req.params.postId)
  Post.findByIdAndUpdate(req.params.postId,{$inc: {thumbsUp: 1}},{new:true}).then(updated=>{console.log(updated)})
  
  // db.collection('clicks').find().toArray((err, result) => {
  //   if (err) return console.log(err);
  //   res.send(result);
  // });
});

// add a document to the DB collection recording the click event
  // app.post('/clicked', (req, res) => {
  //   const click = {clickTime: new Date()};
  //   console.log(click);
  //   console.log(db);
  
  //   db.collection('clicks').save(click, (err, result) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log('click added to db');
  //     res.sendStatus(201);
  //   });
  // });

module.exports = router;
