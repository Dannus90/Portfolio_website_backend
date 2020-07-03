const router = require("express").Router();
const BlogPost = require("../models/littlepost");

router.post("/", async (req, res) => {
    const Post = new BlogPost({
        ...req.body,
    });

    try {
        await Post.save();
        res.status(201).send(Post);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await BlogPost.find({}, (err, blogposts) => {
            if (err) {
                return res.status(400).send("Something went Wrong!");
            }
            return blogposts;
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
