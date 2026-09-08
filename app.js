
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const path = require("path");

const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");

const reviews = require("./routes/review.js");

const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

// Root route
app.get("/", async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    next(err);
  }
});

// Listing routes
app.use("/listings", listings);

// Review routes
app.use("/listings/:id/reviews", reviews);

// 404 Error
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handler
app.use((err, req, res, next) => {
  let {
    statuscode = 500,
    message = "Something went wrong!",
  } = err;

  res.status(statuscode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is Listening to port 8080");
});
