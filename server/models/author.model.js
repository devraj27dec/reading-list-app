const mongoose = require('mongoose');
const {Schema } = mongoose;

const authorScheam = new Schema({
    name:{
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true,
    },
})

exports.Author = mongoose.model('Author' , authorScheam);