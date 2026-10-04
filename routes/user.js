const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");


router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});


router.post("/signup", wrapAsync(async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        const registeredUser = await User.register(newuser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

module.exports = router;