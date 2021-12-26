const User=require('./model/User');
const useroutes=require('./routes/User-routes');
const UserRegister=require('./routes/auth');
const mongoose = require('mongoose');
const express = require("express");
const path = require('path');
const core = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv=require('dotenv');
// const authRoute = require("./routes/auth");
const api = express();

dotenv.config();


mongoose.connect(process.env.DB_URL,{ autoIndex: false }).then(()=>{
  console.log("connected to database");
}).catch((err) => {
  console.log("some error could not connect to DataBase");
});




//middleware
api.use(express.json());
api.use(helmet());
api.use(morgan("common"));

api.use('/api/user',useroutes);
api.use('/api/auth',UserRegister);

api.listen(process.env.PORT || process.env.SERVER_PORT,() => {
    console.log(">---Server is running!---<");
});