const express = require("express");
const {
  login,
  signup,
  verifyOtp,
  forgetPassword,
  updatepassword,
} = require("../controllers/authenticationController/authenticationControllers");
// const { checkAuth } = require('../middleware/auth-middleware')
// const { signupValidators } = require('../validators/signupValidators')
const {
  home,
} = require("../controllers/authenticationController/authenticationControllers");
const router = express.Router();

// router.post('/home',home)
// router.get('/home',home)
router.get("/", home);
router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/forget-password", forgetPassword);
router.post("/forget-password/:id/:token", updatepassword);
// router.post('/logout',logout)

module.exports = router;
