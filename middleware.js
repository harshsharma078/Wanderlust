const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

// Validate Listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};

 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        // Default message for login-required actions
        let message = "You must be logged in!";

        // Special message only for Edit and Delete listing actions
        if (
            req.originalUrl.includes("/edit") ||
            req.method === "DELETE" ||
            req.originalUrl.includes("_method=DELETE")
        ) {
            message = "You must login before editing or deleting a listing!";
        }

        req.flash("error", message);
        return res.redirect("/login");
    }

    next();
};
 


// Save redirect URL
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};

// Check listing owner
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// Check review author
module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId, id } = req.params;

    let review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author) {
        req.flash("error", "This review has no author!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete this review!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};