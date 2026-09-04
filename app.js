const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch(err=> {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings");
  }
});

const validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};


//Index Route
app.get("/listings", wrapAsync(async(req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings");
  }
}));

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


// show route
app.get("/listings/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

// Create Route
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
  
  const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");
}));            

//edit route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
     let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));


// Update route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.                                                                               body.listing});
    res.redirect(`/listings/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletetedlisting =  await     Listing.findByIdAndDelete(id);
    console.log(deletetedlisting);
    res.redirect("/listings"); 
}));

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price: 1200,
//         location:"Calamgute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });

app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

  app.use((err, req, res, next) => {
      let {
          statuscode = 500,
          message = "Something went wrong!"
      } = err;
      res.status(statuscode).render("error.ejs", {message});
  });
app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});