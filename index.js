const express = require ("express");
const mongoose =require ("mongoose");
require ('dotenv').config();
//database
const Database = require("./database");

//API
const Book=require('./API/book');
const Author=require('./API/author');
const Publication=require('./API/publication');

mongoose.connect(
    process.env.MONGO_URI,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
     
   })
   .then(()=> console.log('connection established'))
   .catch((err)=>{
        console.log(err);
    });
//initialisation
const OurApp = express();

OurApp.use(express.json());

//Microservices
OurApp.use("/book",Book);
OurApp.use("/author",Author);
OurApp.use("/publication",Publication);

OurApp.get("/",(request,response) => {
    response.json({message:"Server is working !!"});
});

OurApp.listen(4000,()=> console.log("Server is running !!"));
