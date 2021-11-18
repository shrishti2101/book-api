const { Publication } = require('../database');
const BookModel = require("../schema/book");

const Router=require('express').Router();

/ Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none

Router.get("/publication", async (req, res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
});

// Route    - /publication/:pubId
// Des      - to get specific publication
// Access   - Public
// Method   - GET
// Params   - publication

Router.get("/publication/:pubId", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({Publicationid: parseInt(req.params.pubId)});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id of ${parseInt(req.params.pubId)}`
    });
    }

    return res.json(getSpecificPublication);
});

// Route    - /publication/b/:bookname
// Des      - to get a list of publication based on a book
// Access   - Public
// Method   - GET
// Params   - book

Router.get("publication/b/:bookname", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.bookname});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the book ${req.params.bookname}`
    });
    }

    return res.json(getSpecificPublication);
});

// -----------POST---------------
// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none

Router.post("publication/new", (req, res) => {
    try {
        const { newPublication } = req.body;

        PublicationModel.create(newPublication);
        return res.json({ message: "Publication added to the database" });
    }
    catch(error) {
        return res.json({ error: error.message });
    }
});

// -----------PUT----------------

// Route    - /publication/update/:id
// Des      - update publication
// Access   - Public
// Method   - PUT
// Params   - id

Router.put("publication/update/:id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.name },
        { new: true }
    );

    return res.json(updatedPublication);
});

// Route    - /publication/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id

Router.put("publication/updateBook/:id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { $addToSet: { books: req.body.book } },
        { new: true }
    );
    
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.body.book },
        { publication: parseInt(req.params.id) },
        { new: true }
    );

    return res.json({ publication: updatedPublication, book: updatedBook });
});

// -----------DELETE-------------

// Route    - /publication/deleteBook/:id/:isbn
// Des      - delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - id,isbn

Router.delete("publication/deleteBook/:id/:isbn", async (req, res) => {
    const Id = parseInt(req.params.id);
    const ISBN = req.params.isbn;

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: id },
        { $pull: { books: isbn } },
        { new: true }
    );

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: isbn },
        { publication: -1 },
        { new: true }
    );

    res.json({ publication: updatedPublication, book: updatedBook })
});

// Route    - /publication/delete/:id
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - id

Router.delete("publication/delete/:id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndDelete( 
        { Id: parseInt(req.params.id) }
    );

    return res.json({ publications: updatedPublication });
});
module.exports=Router;