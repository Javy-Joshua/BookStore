const { required } = require("joi")
const mongoose =  require("mongoose")

const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true,
        max: [2024, 'Year must be lessor equal to 2024']  //validation with custom message
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "ISBN must be unique"] // same as above
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0'] //same as above
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
})

const BookModel = mongoose.model("books", BookSchema)

module.exports = BookModel