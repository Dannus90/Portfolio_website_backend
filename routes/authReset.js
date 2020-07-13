const router = require("express").Router();
const { reset } = require("../authControls/AuthController");

router.patch("/reset", reset);

module.exports = router;
