const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name:String,
    genre:String,
    authorId:String
})

module.exports = mongoose.model('Book',BookSchema)