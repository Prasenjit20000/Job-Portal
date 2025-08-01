// configure cloudinary
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
export default cloudinary;

// convert the file into datauri(in this format cloudinary accept files)
// import DataUriParser from 'datauri/parser.js'
// import path from 'path';
// const getDataUrl = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }
// export default getDataUrl;

// upload file in cloudinary and 
// inside controller
// const file = req.file
// const fileURI = getDataUrl(file);
// const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
// if (cloudResponse) {
//     // save the cloudinary url
//     user.profile.resume = cloudResponse.secure_url;
//     // save the original resume name
//     user.profile.resumeOriginalName = file.originalname;
// }