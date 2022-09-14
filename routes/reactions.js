const router = require("express").Router();

// New Emoji Route
router.get('/',(req, res, next) =>{

    
    res.render('emoji/new')
})



module.exports = router;
