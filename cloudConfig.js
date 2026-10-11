
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

console.log("Cloudinary check:", {
    cloud_name: !!process.env.CLOUD_NAME,
    api_key: !!process.env.CLOUD_API_KEY,
    api_secret: !!process.env.CLOUD_API_SECRET,
    configured_api_key: !!cloudinary.config().api_key
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust_DEV",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
});

module.exports = {
    cloudinary,
    storage
};
