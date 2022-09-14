const router = require("express").Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');

router.post('/post/create', (req, res, next) => {
    let dateAdded = new Date(Date.now())
    const dateaddedShort = dateAdded.toLocaleDateString('en-GB' )
    console.log(dateaddedShort)
    dateAdded = dateaddedShort

    const {link, title, topic, mediaType} = req.body
    //let dateFormated = dateAdded.toLocaleDateString()
    // console.log(postedByUser)
    Post.create({link, dateAdded, title, topic, mediaType, postedByUser: req.session.currentUser})
    .then(createdPost => {
        //console.log(createdPost)
        res.redirect('/')
    })
    .catch(err => next(err))

})

router.get('/post/delete/:id', (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/')
    })
    .catch(err => next(err))
})


module.exports = router;