 
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const trendingRouter = require("./routes/trending.js");

const Listing = require("./models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

// Database Connection
async function main() {
    if (!dbUrl) {
        throw new Error("ATLASDB_URL is missing from .env file");
    }

    if (
        !dbUrl.startsWith("mongodb+srv://") &&
        !dbUrl.startsWith("mongodb://")
    ) {
        throw new Error(
            "Invalid MongoDB URL format. Check ATLASDB_URL in .env"
        );
    }

    await mongoose.connect(dbUrl);
}

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.error("Error in MongoDB session store:", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/trending", trendingRouter);

// Root route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//     let registeredUser = await User.register(fakeUser, "hellowworld");
//     res.send(registeredUser);
// });

// Listing routes
app.use("/listings", listingsRouter);

// Review routes
app.use("/listings/:id/reviews", reviewsRouter);

app.use("/", userRouter);

// 404 Error
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("ACTUAL ERROR:", err);

    const statusCode = err.statuscode || err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    res.status(statusCode).render("error.ejs", { message });
}); 

app.listen(8080, () => {
    console.log("Server is Listening to port 8080");
});
 
