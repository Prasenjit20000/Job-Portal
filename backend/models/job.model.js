import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // skills required
    requirements: [{
        type: String,
        required: true
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType:{
        type:String,
        required:true
    },
    experienceLevel:{
        type : String,
        required : true
    },
    // opennings
    position:{
        type : Number,
        required:true
    },
    // job and which company's job
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
},{timestamps:true});
export const Job = mongoose.model('Job',jobSchema);