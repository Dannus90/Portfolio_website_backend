const router = require("express").Router();
const { forgot } = require("../authControls/AuthController");

router.post("/forgot", forgot);

module.exports = router;
