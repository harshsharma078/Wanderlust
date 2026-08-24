const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

//Index Route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching listings");
  }
});

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


// show route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// Create Route
app.post("/listings", async(req,res)=>{
     const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");
});            

//edit route
app.get("/listings/:id/edit", async(req,res)=>{
     let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


// Update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.                                                                               body.listing});
    res.redirect(`/listings/${id}`);
});

// Delete route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let deletetedlisting =  await     Listing.findByIdAndDelete(id);
    console.log(deletetedlisting);
    res.redirect("/listings"); 
});

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

app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});