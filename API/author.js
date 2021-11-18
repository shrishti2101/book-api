const AuthorModel = require('../schema/author');

const Router=require('express').Router();

//Route------/authors
//Des--------to get all authors
//Access------Public
//Method------GET
//Params-------none
Router.get("/author",async(req,res)=>{
    const getAllAuthors =await AuthorModel.find();
    return res.json(getAllAuthors);
});

// Route    - /author/:id
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - author
Router.get("/author/:id", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({Authorid: parseInt(req.params.id)});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found for the id of ${parseInt(req.params.id)}`
    });
    }

    return res.json(getSpecificAuthor);
});

// Route    - /author/book/:book
// Des      - to get list of author based on a book
// Access   - Public
// Method   - GET
// Params   - author
Router.get("/author/b/:book", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.book});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found for the book ${req.params.book}`
    });
    }

    return response.json(getSpecificAuthor);
});


// --------------POST-------------------
//Route------/author/new
//Des--------to add new author 
//Access------Public
//Method------POST
//Params-------none
Router.post("/author/new",(req,res)=>{
    const {newAuthor} = req.body;
       Author.create(newAuthor);
    return res.json({message:'author added to the database'});
});


// --------------PUT-------------------
// Route    - /author/update/:id
// Des      - update author details
// Access   - Public
// Method   - PUT
// Params   - id
Router.put("/author/update/:id", async (req, res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.name },
        { new: true }
    );

    return res.json(updatedAuthor);
});

// --------------DELETE-------------------
// Route    - /author/delete/:id
// Des      - delete an author
// Access   - Public
// Method   - DELETE
// Params   - ID
Router.delete("/delete/:id", async (req, res) => {
    const updatedAuthor = await AuthorModel.findOneAndDelete( 
        { Id: parseInt(req.params.id) }
    );

    return res.json({ authors: updatedAuthor });
});

module.exports=Router;