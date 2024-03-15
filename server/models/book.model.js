const mongoose = require('mongoose')
const {Schema } = mongoose;

const bookSchema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    genre: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true
    }
})

exports.Book = mongoose.model('Book' , bookSchema)