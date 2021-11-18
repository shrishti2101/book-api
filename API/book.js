const Router=require('express').Router();

const BookModel = require('../schema/book');
const AuthorModel=require('../schema/author');

//Route------/book
//Des--------to get all books
//Access------Public
//Method------GET
//Params-------none
Router.get("/book",async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks);
});

//Route------/book/:isbn
//Des--------to get specific book based on ISBN
//Access------Public
//Method------GET
//Params-------isbn
Router.get("/book/:isbn",async(req,res) =>{
    const getSpecificBook =await BookModel.findOne({ISBN:req.params.isbn})
      if(!getSpecificBook){
          return res.json({
              error:`No book found for the ISBN of $(req.params.bookID)`,
          })
      }
    return res.json({book:getSpecificBook}); 
});

//Route------/book/c/:category
//Des--------to get specific book based on category
//Access------Public
//Method------GET
//Params-------category
Router.get("/book/c/:category",async(req,res) =>{
    const getSpecificBooks = await BookModel.find({
        category:req.params.category,
        });
        if(!getSpecificBooks){
            return res.json({error:`No book founf for the category of ${req.params.category}`})
        }
    return res.json({books:getSpecificBooks});
    });

// Route    - /book/a/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
Router.get("book/a/:author", async (request, response) => {
    const getSpecificBook = await BookModel.findOne({authors: parseInt(request.params.author)});

    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the author of ${parseInt(request.params.author)}`
    });
    }

    return response.json(getSpecificBook);
});

// -----------------POST-------------------------

//Route------/book/new
//Des--------to add new book
//Access------Public
//Method------POST
//Params-------none
Router.post("/book/new",async(req,res)=>{
  
    try{  const{newBook} = req.body;
          await Book.create (newBook);
   
          return res.json({message:'Book added to the the database'});
    }catch(error){
       return res.json({error:error.message})
   }   
   });

// -----------------PUT-------------------------
//Route------/bookAuthor/update/:isbn
//Des--------update/add new author to a book 
//Access------Public
//Method------PUT
//Params-------ISBN
Router.put("/book/updateAuthor/:isbn",async(req,res)=>{
    const {newAuthor} =req.body;
    const {isbn} = req.params;

    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN:isbn
        },
        {
            $addToSet:{
                authors:newAuthor
            }
        },
        {
            new:true,
        }
    );
    const updateAuthor =await Author.findOneAndUpdate(
        {
            id:newAuthor,
        },
        {
            $addToSet:isbn,
        },
        {
            new:true
        }
    )
    return res.json({
        book:updateBook,
        author:updateAuthors,
        message:'New author was added into the database'
    });
});

//Route------/book/updateTitle
//Des--------to update title of book 
//Access------Public
//Method------PUT
//Params-------ISBN
Router.put("/book/updateTitle/:isbn",async(req,res)=>{
    const {title}=req.body.title;
    const updateBook =await BookModel.findOneAndUpdate(
      {
        ISBN:req.params.isbn,
      },
      { 
        title:title,
      },
      {
          new:true,
      }
    )
    return res.json({book:updateBook});
});

// -----------------DELETE-------------------------

//Route------/book/delete/:isbn
//Des--------delete a book
//Access------Public
//Method------DELETE
//Params-------ISBN
Router.delete("/book/delete/:isbn",async(req,res)=>{
    const {isbn}=req.params;

    const updateBookDatabase = await BookModel.findOneAndDelete({
        ISBN:isbn
    })

   return res.json({book:updateBookDatabase});
});

//Route------/book/delete/author
//Des--------delete an author from book
//Access------Public
//Method------DELETE
//Params-------ISBN,id
Router.delete("/book/delete/author/update/:isbn/:id",async(req,res)=>
{
const {isbn,id}=req.params;
//updating book database object
 const updateBook = await BookModel.findOneAndUpdate(
    {
     ISBN:isbn
    },
    {
      $pull:{
         authors:parseInt(id),
        },
    },
    {
         new:true,
    }
 )

   const updateAuthor =await AuthorModel.findOneAndUpdate(
    {
        id:parseInt(id),
    },
    {
        $pull:{
            books:isbn,
        },
    },
    {
        new:true
    }
)
  return res.json({message:'Author was deleted',book:updatedBook,author:updatedAuthor});
})

module.exports =Router;