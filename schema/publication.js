const mongoose = require("mongoose");


//Publication schema
const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String]
})

//Publication Model
const PublicationModel= mongoose.model('publication',PublicationSchema);

module.exports =PublicationModel;