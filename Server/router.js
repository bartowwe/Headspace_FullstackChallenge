const router = require('express').Router();
const {blogController} = require('./controller');

router.route('/blog')
    .get(blogController.get)

module.exports = router;