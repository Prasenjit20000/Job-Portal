import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    phoneNumber: {
        type : Number,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    role: {
        type : String,
        enum : ['student','recruiter'],
        required : true
    },
    profile: {
        bio : {type : String},
        skills : [{type : String}],
        resume : {type : String},   //url for resume
        resumeOriginalName : {type : String},    //when upload a resume by user it stpores the actual name(in user machine)
        company : {type : mongoose.Schema.Types.ObjectId, ref: 'Company'},//companies where this user already applied
        profilePhoto : {
            type : String,
            default : ''
        }
    }

},{timestamps : true});
export const User = mongoose.model('User',userSchema);