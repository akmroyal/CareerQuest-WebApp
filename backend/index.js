import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDb from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/jobs.route.js';
import applicationRoute from './routes/application.route.js';
import path from 'path';
dotenv.config({});

const app = express();
const _dirname = path.resolve()


//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended:true }));
app.use(cookie());
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:true
}
app.use(cors(corsOptions));

//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=> {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html")); 
})


const PORT = process.env.PORT || 6000 ;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server Running on port ${PORT}`);
  });