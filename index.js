const express = require ("express");

//database
const Database = require("./database");

//initialisation
const OurApp = express();

OurApp.use(express.json());

OurApp.get("/",(request,response) => {
    response.json({message:"Server is working !!"});
});

//Route------/book
//Des--------to get all books
//Access------Public
//Method------GET
//Params-------none
//Body---------none
OurApp.get("/book",(req,res)=>{
    return res.json({books:Database.Book});
});

//Route------/book/:bookId
//Des--------to get specific book based on ISBN
//Access------Public
//Method------GET
//Params-------BookId
//Body---------none
OurApp.get("/book/:bookID",(req,res) =>{
    const getBook = Database.Book.filter((book) => book.ISBN ===req.params.bookID);
return res.json({book:getBook}); 
});

//Route------/book/c/:category
//Des--------to get specific book based on category
//Access------Public
//Method------GET
//Params-------category
//Body---------none
OurApp.get("/book/c/:category",(req,res) =>{
const getBook = Database.Book.filter((book)=> book.category.includes(req.params.category)
);
return res.json({book:getBook});
});

//Route------/book/author/:authorId
//Des--------to get a list of based on author
//Access------Public
//Method------GET
//Params-------authorId
//Body---------none
OurApp.get("/book/a/:authorId",(req,res)=>{
    const aId =req.params.authorId;
    const authId = parseInt(aId);
    const getBook = Database.Book.filter((book)=>book.authors.includes( authId)
    );
    return res.json({book:getBook});

});

//Route------/authors
//Des--------to get all authors
//Access------Public
//Method------GET
//Params-------none
//Body---------none
OurApp.get("/author",(req,res)=>{
    return res.json({authors:Database.Author});
});

//Route------/author/a/:authorId
//Des--------to get specific author 
//Access------Public
//Method------GET
//Params-------authorId
//Body---------none
OurApp.get("/author/a/:authorId",(req,res)=>{
    const aId =req.params.authorId;
    const authId = parseInt(aId);
    const getAuthor = Database.Author.filter((author)=>author.id === authId
    );
    return res.json({author:getAuthor});

});

//Route------/book/new
//Des--------to add new book
//Access------Public
//Method------POST
//Params-------none
OurApp.post("/book/new",(req,res)=>{
    console.log(req.body);
    return res.json("book added sucessfully");
});

//Route------/author/new
//Des--------to add new author 
//Access------Public
//Method------POST
//Params-------none
OurApp.post("/author/new",(req,res)=>{
    const {newAuthor} = req.body;
    console.log(newAuthor);
    return res.json({message:"author added successfully"});
});


//Route------/publication/new
//Des--------add new publication
//Access------Public
//Method------POST
//Params-------none

OurApp.post("/publication/new",(req,res)=>{
const publication =req.body;
console.log(publication);
return res.json({message:"publication added successfully"});
});

OurApp.listen(4000,()=> console.log("Server is running !!"));