const express = require("express");
const { registerUser, loginWithEmailAndPassword, testLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginWithEmailAndPassword);

router.post("/test-login", testLogin);

module.exports = router;
