import mongoose from "mongoose";

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true,
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
    },
    position:{
        type:Number,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application",
    }],
    status:{
        type:String,
        enum:["pending", "approved", "rejected"],
        default:"approved" // Auto-approve for now, can be changed to "pending" for moderation
    },
    moderationReason:{
        type:String,
        default:""
    },
    moderatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    moderatedAt:{
        type:Date
    }
},{timestamps:true})

const Job= mongoose.model("Job",jobSchema);
export default Job;