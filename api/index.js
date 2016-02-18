var router	= require('express').Router();
var post	= require('./post.js');

router.use('/post',post);

module.exports = router;
