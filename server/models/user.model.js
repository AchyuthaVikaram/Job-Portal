import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phno:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true,
    },
    profile:{
        bio:String,
        skills:[{type:String}],
        resume:String,// url to resume 
        resumeOriginalName:String,
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company",
        },
        profilePhoto:{
            type:String,
            default:"",
        },
    },
},{timestamps:true})


const User= mongoose.model("User",userSchema);
export default User;