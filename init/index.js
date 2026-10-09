require("dotenv").config();

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const OWNER_ID = "6ac66fc65f621d9e581db69e";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const mapToken = process.env.MAP_TOKEN;
    const geocodingClient = mapToken
        ? mbxGeocoding({ accessToken: mapToken })
        : null;

    let added = 0;
    let skipped = 0;

    try {
        for (const item of initData.data) {
            const exists = await Listing.findOne({
                title: item.title,
                location: item.location
            });

            if (exists) {
                skipped++;
                continue;
            }

            const newListing = {
                ...item,
                owner: OWNER_ID
            };

            // The Listing schema requires GeoJSON geometry.
            if (!newListing.geometry && geocodingClient) {
                try {
                    const response = await geocodingClient
                        .forwardGeocode({
                            query: `${item.location}, ${item.country}`,
                            limit: 1
                        })
                        .send();

                    if (response.body.features.length > 0) {
                        newListing.geometry =
                            response.body.features[0].geometry;
                    }
                } catch (error) {
                    console.error(
                        `Geocoding failed for ${item.title}:`,
                        error.message
                    );
                }
            }

            // Never insert fake coordinates such as [0, 0].
            if (
                !newListing.geometry ||
                newListing.geometry.type !== "Point" ||
                !Array.isArray(newListing.geometry.coordinates) ||
                newListing.geometry.coordinates.length !== 2
            ) {
                console.log(
                    `Skipped "${item.title}": valid coordinates unavailable.`
                );
                skipped++;
                continue;
            }

            await Listing.create(newListing);
            added++;

            console.log(`Added: ${item.title}`);
        }

        console.log("\nSeed completed!");
        console.log(`Added: ${added}`);
        console.log(`Skipped: ${skipped}`);
        console.log("Existing listings were not deleted.");
    } finally {
        await mongoose.disconnect();
    }
}

main().catch(error => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
});