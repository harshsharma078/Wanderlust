const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");

const {
    isLoggedIn,
    isOwner,
    validateListing
} = require("../middleware.js");


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image][url]"),
        wrapAsync(listingController.createListing)
    );


router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);


router.route("/:id")
    .get(
        wrapAsync(listingController.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.updateLitings)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );


router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;