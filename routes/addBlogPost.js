const router = require("express").Router();
const verify = require("../middleware/privateRoutes");

router.get("/", verify, async (req, res) => {
    console.log("Reached here!");
});

module.exports = router;
