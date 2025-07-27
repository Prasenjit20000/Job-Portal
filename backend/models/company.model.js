import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    description:{
        type : String,
    },
    website:{
        type : String,
    },
    location:{
        type : String,
    },
    name:{
        type : String,
    },
    logo:{
        type : String,
    },
    // which user create the company
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});
export const Company = mongoose.model('Comapany',companySchema);