const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/pharaoh-relief-with-scarab-cartouche-hjL7-u5_g1s",
      set: (v) =>
        v === " "
          ? "https://unsplash.com/photos/pharaoh-relief-with-scarab-cartouche-hjL7-u5_g1s"
          : v,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
