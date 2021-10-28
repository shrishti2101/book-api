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
    const{newBook} = req.body;

    //Add new data
    Database.Book.push(newBook);
    console.log(newBook);
    return res.json(Database.Book);
});

//Route------/author/new
//Des--------to add new author 
//Access------Public
//Method------POST
//Params-------none
OurApp.post("/author/new",(req,res)=>{
    const {newAuthor} = req.body;
       Database.Author.push(newAuthor);
    return res.json(Database.Author);
});


//Route------/publication/new
//Des--------add new publication
//Access------Public
//Method------POST
//Params-------none

OurApp.post("/publication/new",(req,res)=>{
const {newpublication} =req.body;
Database.Publication.push(newpublication);
return res.json(Database.Publication);
});

//Route------/book/update
//Des--------to update book details
//Access------Public
//Method------PUT
//Params-------ISBN

OurApp.put("/book/update/:isbn",(req,res)=>{
const {updatedBook} =req.body;
const {isbn} = req.params;

const book= Database.Book.map((book)=>{
    if(book.ISBN === isbn){
        return{...book,...updatedBook};
    }
    return book;
})
return res.json(book);
});

//Route------/bookAuthor/update/:isbn
//Des--------update/add new author to a book 
//Access------Public
//Method------PUT
//Params-------ISBN
OurApp.put("/bookAuthor/update/:isbn",(req,res)=>{
    const {newAuthor} =req.body;
    const {isbn} = req.params;

    Database.Book.forEach((book)=>{
        //check if ISBN match
        if(book.ISBN === isbn){
            //check if author already exist
            if(!book.authors.includes(newAuthor))
            {//if not,then pushnew author
                return book.authors.push(newAuthor);
            }
            return book;
        }
        return book;
    })
    //update author Database object
    const author=Database.Author.map((author)=>{
        if(author.id === newAuthor){
            if(!author.books.includes(isbn)){
              return author.books.push(isbn);
             }
             return author;
        }
        return author;
    });
    return res.json({book:Database.Book,author:Database.Author});
});

//Route------/author/update/:id
//Des--------update any  details of author 
//Access------Public
//Method------PUT
//Params-------Id

 OurApp.put("/author/updatedAuthor/:id",(req,res)=>{
const {updatedAuthor} =req.body;
const {id} = req.params;

const author= Database.Author.map((author)=>{
    if(author.id === parseInt(id)){
        return{...author,...updatedAuthor};
    }
    return author;
})
return res.json(author);
 });





OurApp.put("/author/update/:id",(req,res)=>{
    const {updateAuthor}=req.body;
    const {id}=req.params;

   const author = Database.Author.map((author)=>{
        if(author.id === parseInt(id)){
            return{...author,...updateAuthor};
        }
        return author;
    });
    return res.json(author);
}); 

OurApp.listen(4000,()=> console.log("Server is running !!"));