const logger = require("../logger")
const bookModel = require("../models/books")

const getALLBooks = async (req, res) => {
    logger.info("get all book process has started")
    try {
        const books = await bookModel.find()
        res.status(200).json(books)
    } catch (error) {
        logger.error(`Error fetching books: ${error.message}`);
        console.error(error)
        res.status(500).json({
            error: "An error occurred while fetching books"
        })
    }
}

const getBookById = async (req, res) => {
    logger.info("[get a bok by id] => process has started")
    const Id = req.params.id
    try {
        const book = await bookModel.findById(Id);
        if(!book) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            })
        }
         
        return res.status(200).json({
            book
        })
    } catch (error) {
        logger.error(`Error fetching book: ${error.message}`);
        console.error(error)
        return res.status(500).json({
          message: "Server error",
          success: false
        });
    }
    
}

const createBook = async (req, res) => {
    logger.info("[create a book] => proccess has started")
    const bookFromRequest = req.body
    bookFromRequest.lastUpdateAt = new Date()  //set the lastupdate to the current day

    try {
        const existingIsbn = await bookModel.findOne({ isbn: bookFromRequest.isbn})

        if(existingIsbn){
            return res.status(409).json({
                message:"ISBN already exist"
            })
        }
        
        const book = await bookModel.create({
            title: bookFromRequest.title,
            shortDescription: bookFromRequest.shortDescription,
            longDescription: bookFromRequest.longDescription,
            year: bookFromRequest.year,
            isbn: bookFromRequest.isbn,
            price: bookFromRequest.price
        })

        res.status(200).json({
            message:"Book created successfully"
        })
    } catch (error) {
        logger.error(`Error fetching book: ${error.message}`);
        console.error(error);
        return res.status(500).json({
          message: "Server error",
          success: false,
        });
    }
}

const updateBook = async (req, res) => {
    logger.info("Update a book by id => proccess has started")
    const bookId = req.params.id
    bookModel.lastUpdateAt = new Date()
    try {
        const update = req.body
        const book = bookModel.findById({_id: bookId})
        
        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }
        
        const bookUpdate = await bookModel.findByIdAndUpdate(bookId, update, {new: true})
        return res.status(200).json({
            bookUpdate
        })

    } catch (error) {
        logger.error(`Error fetching book: ${error.message}`);
        console.error(error)
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

const deleteBook = async (req, res) => {
    logger.info("[deleting a book")
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById({_id: bookId})
        if (!book) {
            return res.ststus(404).json({
                message: "Book not found",
                success: false
            })
        }

        const deletedbook = await bookModel.findByIdAndDelete( bookId)
        //respond with deleted book
        return res.status(200).json({
            message: "Book successfuly deleted",
            success: true,
            deletedbook,
        })
    } catch (error) {
        logger.error(`Error fetching book: ${error.message}`);
         console.error(error);
         return res.status(500).json({
           message: "Server error",
           success: false,
         });
    }
}




module.exports = {
    getALLBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}