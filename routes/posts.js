const router = require("express").Router();
const verify = require("../middleware/privateRoutes");
const User = require("../models/User");

router.get("/", verify, (req, res) => {
    res.send(req.user);
    User.findbyOne({ _id: req.user });
});

module.exports = router;
