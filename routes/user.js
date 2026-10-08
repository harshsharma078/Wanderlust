const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

// Signup page
router.get("/signup", userController.renderSignupForm);

// Signup
router.post(
    "/signup",
    wrapAsync(userController.signup));

// Login page
router.get("/login",userController.renderLoginForm);

// Login
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);

// Logout
router.get("/logout", userController.logout);

module.exports = router;