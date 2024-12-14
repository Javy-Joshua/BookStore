const { required } = require("joi")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    country:{
        type:String,
        required: false
    },
    books: {
        type: Array,
        default: [ ]
    }
}, {timestamps: true})

const AuthorModel = mongoose.model("authors", AuthorSchema); 

module.exports = AuthorModel
