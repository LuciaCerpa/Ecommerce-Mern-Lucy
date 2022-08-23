//const express = requiere('express')
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.route.js';
import usersRouter from './routes/users.route.js';
//import purchasesRouter from './routes/purchases.route.js';
import cartsRouter from './routes/carts.route.js';


dotenv.config({ path: "./config.env" });

//Connect with MongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err.message);
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"));

//routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
//app.use("/api/v1/purchases", purchasesRouter);
app.use("/api/v1/carts", cartsRouter);

//Create Port
const PORT = process.env.PORT || 5000 

//Listen
app.listen(PORT, () => {
    console.log(`Serve at running on the port http://localhost:${PORT}`);
})

