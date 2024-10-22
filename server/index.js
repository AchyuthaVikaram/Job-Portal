import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/dbConnection.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"; 
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const corsOptions={
    origin:"http://localhost:5173",
    credentials: true,
}

const app=express();
const PORT=process.env.PORT || 3000;

const _dirname=path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

app.use(express.static(path.join(_dirname,"/client/dist")));

app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

app.listen(PORT,(req,res)=>{
    connectDB();
    console.log(`app is listening to port ${PORT} `);
})
