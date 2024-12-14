const express = require("express");
const { loginWithEmailAndPassword, testLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/login", loginWithEmailAndPassword);
router.post("/test-login", testLogin);

module.exports = router;
