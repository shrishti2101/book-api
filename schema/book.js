const mongoose = require("mongoose");

//create book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    authors:[Number],
    language:String,
    pubDate:String,
    numofPage:Number,
    category:[String],
    publication:Number
}); 

//create book model
const BookModel= mongoose.model('book',BookSchema);

module.exports = BookModel;

