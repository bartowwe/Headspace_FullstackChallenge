
const blogController = {
    //this api is only using the get functions so we will ignore the rest of CRUD
    get: (req,res) =>{
        var tumblr = require('tumblr.js');
        var client = tumblr.createClient({ consumer_key: 'wQc7zrYdnBkKTutH0ae3sLBopdSNqqy1VbkiELKvzj3Y5FCV5s' });
        // Make the request
        //if there is a blog name
        if (req.query.blogname !== '')
        {
            client.blogPosts(`${req.query.blogname}.tumblr.com`, { tag: req.query.tag }, function (err, data) {
                if (err){console.error(err)}
                else{res.status(200).send(data)}
            });
        }
        //if the only criteria is a tag
        else {
            client.taggedPosts(req.query.tag, function (err, data) {
                if (err){console.error(err)}
                else{res.status(200).send(data)}
            });
        }

    },
};

module.exports = { blogController };