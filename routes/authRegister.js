const router = require("express").Router();
const { register } = require("../authControls/AuthController");

router.post("/register", register);

module.exports = router;
