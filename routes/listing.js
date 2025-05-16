const express = require("express");
const router = express.Router();  // to module our code and routes for different models
const wrapAsync= require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn}= require("../middleware.js");
const {isOwner , validateListing}= require("../middleware.js");
const listingController = require("../controllers/listings.js");


//for uploading images on uploads/ folder 
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

// const upload = multer({ dest: 'uploads/'  })
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"), validateListing, 
    wrapAsync(listingController.createListing));
 
//index route 

    
    
  
    //new route
    router.get("/new",isLoggedIn,listingController.renderNewForm);
    
  
    
    
    //Edit Route
    router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));
      
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
  

    
    
    

    module.exports = router;