const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connect = async (url) => {
    mongoose.connect(url || process.env.MONGODB_URL || 'mongodb://localhost:27017/Todo_db')

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB successfully")
    })

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred connecting to mongoDB")
        console.log(err)
    })

}

module.exports = {
    connect
}