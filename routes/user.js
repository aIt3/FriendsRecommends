const router = require("express").Router();

// New User route
router.get('/new',(req, res, next) =>{
    res.render("user/new")
});

// Create User
router.post('/',(req, res, next) =>{
    res.send("user created")
});

// Update User
router.put('/',(req, res, next) =>{
    res.send("user updated")
});

module.exports = router;
