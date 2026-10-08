const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let mapCoordinates = null;

    // Agar geometry already hai, wahi coordinates use karo
    if (
        listing.geometry &&
        listing.geometry.coordinates &&
        listing.geometry.coordinates.length === 2
    ) {
        mapCoordinates = listing.geometry.coordinates;
    } else {
        // Purani listing ke liye location se coordinates nikalo
        const response = await geocodingClient
            .forwardGeocode({
                query: `${listing.location}, ${listing.country || ""}`,
                limit: 1
            })
            .send();

        if (response.body.features.length > 0) {
            mapCoordinates = response.body.features[0].geometry.coordinates;

            // Purani listing me geometry permanently save kar do
            listing.geometry = response.body.features[0].geometry;
            await listing.save();
        }
    }

    res.render("listings/show.ejs", {
        listing,
        mapToken,
        mapCoordinates
    });
};

module.exports.createListing = async (req, res) => {

    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    let geometry = response.body.features[0].geometry;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.geometry = geometry;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;

    originalImageUrl = originalImageUrl.replace(
        "/upload",
        "/upload/h_300,w_250"
    );

    res.render("listings/edit.ejs", {
        listing,
        originalImageUrl
    });
};

module.exports.updateLitings = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    await Listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };

        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
};