const router = require("express").Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');

router.post('/', (req, res, next) => {
    let dateAdded = new Date(Date.now())
    const dateaddedShort = dateAdded.toLocaleDateString('en-GB' )
    console.log(dateaddedShort)
    dateAdded = dateaddedShort

    const {link, title, topic, mediaType} = req.body
    //let dateFormated = dateAdded.toLocaleDateString()
    // console.log(postedByUser)
    Post.create({link, dateAdded, title, topic, mediaType, postedByUser: req.session.currentUser})
    .then(createdPost => {
        console.log(createdPost)
        res.redirect('/')
    })
    .catch(err => next(err))

})
router.post('/{{posts.id}}/delete', (req, res, next) => {
    let = deletePost = req.params.id
    Post.findByIdAndRemove(deletePost)
    .then(postsFromDB)
})

module.exports = router;