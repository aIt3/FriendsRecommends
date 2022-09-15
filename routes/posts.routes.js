const router = require("express").Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route.guard.js');


router.post('/post/create', isLoggedIn, (req, res, next) => {
    let dateAdded = new Date(Date.now())
    const dateaddedShort = dateAdded.toLocaleDateString('en-GB' )
    console.log(dateaddedShort)
    dateAdded = dateaddedShort

    let {link, title, topic, mediaType} = req.body
    topic = topic.split(',')
    //let dateFormated = dateAdded.toLocaleDateString()
    // console.log(postedByUser)
    Post.create({link, dateAdded, title, topic, mediaType, postedByUser: req.session.currentUser})
    .then(createdPost => {
        //console.log(createdPost)
        res.redirect('/')
    })
    .catch(err => next(err))

})

router.post('/', (req, res, next) => {
    //only get Post where Post.postedByUser === session.currentUser 

})

router.get('/post/delete/:id', (req, res, next) => {
    // Check if creator is current user 
    Post.findById(req.params.id)
    .then((foundPost) => {
        console.log(foundPost.postedByUser)
        console.log(req.session)
        if (!req.session.currentUser || !req.session.currentUser === foundPost.postedByUser){
            return res.status({error: 'forbidden', message: 'You cant delete this project.'})
        } 
        Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => next(err))
    })})

   

router.get('/post/edit/:id', (req, res, next) => {
    Post.findById(req.params.id)
    .then(postFromDB => {
        res.render('post/edit', {post: postFromDB})
    })
    .catch(err => next(err))
})


module.exports = router;