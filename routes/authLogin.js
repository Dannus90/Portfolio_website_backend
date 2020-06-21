const router = require("express").Router();
const { login } = require("../authControls/AuthController");

router.post("/login", login);

module.exports = router;
