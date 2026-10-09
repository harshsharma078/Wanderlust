
    const Listing = require("../models/listing");
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

    const mapToken = process.env.MAP_TOKEN;

    const geocodingClient = mbxGeocoding({
        accessToken: mapToken
    });

    const categoryKeywords = {
        "Rooms": [
            "room", "rooms", "bedroom", "bedrooms",
            "suite", "suites", "apartment", "apartments"
        ],
        "Iconic Cities": [
            "city", "cities", "urban", "downtown",
            "metropolitan", "skyline"
        ],
        "Mountains": [
            "mountain", "mountains", "hill", "hills",
            "himalaya", "himalayas", "valley", "valleys"
        ],
        "Castles": [
            "castle", "castles", "fort", "fortress",
            "palace", "palaces"
        ],
        "Amazing Pools": [
            "pool", "pools", "swimming", "infinity pool"
        ],
        "Camping": [
            "camping", "campsite", "campsites",
            "tent", "tents", "glamping"
        ],
        "Farms": [
            "farm", "farms", "farmhouse", "ranch",
            "barn", "rural"
        ],
        "Arctic": [
            "arctic", "snow", "snowy", "ice",
            "glacier", "glaciers", "tundra", "polar"
        ]
    };

    const categories = ["Trending", ...Object.keys(categoryKeywords)];

    // INDEX: Display listings, categories and destination search
    module.exports.index = async (req, res) => {
        const allListings = await Listing.find({});

        const requestedCategory =
            typeof req.query.category === "string"
                ? req.query.category.trim().toLowerCase()
                : "trending";

        const selectedCategory =
            categories.find(
                category => category.toLowerCase() === requestedCategory
            ) || "Trending";

        const searchQuery =
            typeof req.query.search === "string"
                ? req.query.search.trim()
                : "";

        let filteredListings = allListings;

        // 1. Filter by category
        if (selectedCategory !== "Trending") {
            const keywords = categoryKeywords[selectedCategory];

            filteredListings = filteredListings.filter(listing => {
                const searchableText = [
                    listing.title,
                    listing.description,
                    listing.location
                ]
                    .filter(value => typeof value === "string")
                    .join(" ")
                    .toLowerCase();

                return keywords.some(keyword =>
                    searchableText.includes(keyword.toLowerCase())
                );
            });
        }

        // 2. Search by destination
        if (searchQuery) {
            const searchText = searchQuery.toLowerCase();

            filteredListings = filteredListings.filter(listing => {
                const searchableText = [
                    listing.title,
                    listing.location
                ]
                    .filter(value => typeof value === "string")
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(searchText);
            });
        }

        res.render("listings/index.ejs", {
            allListings: filteredListings,
            selectedCategory,
            categories,
            searchQuery
        });
    };


    // NEW: Render the new listing form
    module.exports.renderNewForm = (req, res) => {
        res.render("listings/new.ejs");
    };


    // SHOW: Display one listing
    module.exports.showListing = async (req, res) => {
        const { id } = req.params;

        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author"
                }
            })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        let coordinates = listing.geometry?.coordinates;

        // Geocode older listings that have no saved coordinates
        if (
            (!coordinates || coordinates.length !== 2) &&
            listing.location &&
            mapToken
        ) {
            try {
                const geoData = await geocodingClient
                    .forwardGeocode({
                        query: `${listing.location}, ${listing.country}`,
                        limit: 1
                    })
                    .send();
                if (geoData.body.features.length > 0) {
                    const coordinates =
                        geoData.body.features[0].geometry.coordinates;

                    listing.geometry = {
                    type: "Point",
                    coordinates: coordinates
    };
}
            } catch (error) {
                console.error("Geocoding error:", error.message);
            }
        }
        res.render("listings/show.ejs", {
        listing,
        mapToken,
        mapCoordinates: coordinates
    });
    };

    module.exports.createListing = async (req, res) => {
        const listingData = req.body.listing;
        const newListing = new Listing(listingData);

        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        // Save valid Point geometry from Mapbox
        if (mapToken && listingData.location) {
            try {
                const geoData = await geocodingClient
                    .forwardGeocode({
                        query: `${listingData.location}, ${listingData.country}`,
                        limit: 1
                    })
                    .send();

                if (geoData.body.features.length > 0) {
                    const coordinates =
                        geoData.body.features[0].geometry.coordinates;

                    newListing.geometry = {
                        type: "Point",
                        coordinates: coordinates
                    };
                }
            } catch (error) {
                console.error("Geocoding error:", error.message);
            }
        }

        await newListing.save();

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    };

    // EDIT: Render the edit form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", {
        listing,
        originalImageUrl: listing.image?.url
    });
};


 
// UPDATE: Update a listing
module.exports.updateLitings = async (req, res) => {
    const { id } = req.params;
    const listingData = req.body.listing;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    // Update normal listing fields only
    listing.title = listingData.title;
    listing.description = listingData.description;
    listing.price = listingData.price;
    listing.location = listingData.location;
    listing.country = listingData.country;

    // Update image only if a new image is uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // Update geometry using valid GeoJSON Point
    if (mapToken && listingData.location && listingData.country) {
        try {
            const geoData = await geocodingClient
                .forwardGeocode({
                    query: `${listingData.location}, ${listingData.country}`,
                    limit: 1
                })
                .send();

            if (geoData.body.features.length > 0) {
                const coordinates =
                    geoData.body.features[0].geometry.coordinates;

                listing.geometry = {
                    type: "Point",
                    coordinates: coordinates
                };
            }
        } catch (error) {
            console.error("Geocoding error:", error.message);
        }
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${listing._id}`);
};

    // DELETE: Delete a listing
    module.exports.destroyListing = async (req, res) => {
        const { id } = req.params;

        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    };