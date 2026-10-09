const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("listings/trending.ejs");
});

module.exports = router;