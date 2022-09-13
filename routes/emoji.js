const router = require("express").Router();

// New Emoji Route
router.get('/',(req, res, next) =>{
    res.render("emojis/new")
})

// Create Emoji Route
router.post('/',(req, res, next) =>{
    res.send("create")
})

module.exports = router;
