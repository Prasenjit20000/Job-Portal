import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        // here we connected backend with database
        // MONGO_URI store the url of database(not local one),which help in deployment
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;