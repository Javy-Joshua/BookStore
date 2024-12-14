const AuthorModel = require("../models/author.model");
const logger = require("../logger")


const getAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.find();
    return res.status(200).json({ authors });
  } catch (error) {
    logger.error(`Error fetching authors: ${error.message}`);
    console.log(error);
    return res.staus(500).json({
      message: "An error occured while fetching authors",
      success: false,
    });
  }
};

const createAuthor = async (req, res) =>{
  logger.info("[create author]=> create author process started")
  const authorFromRequest = req.body
  authorFromRequest.lastUpdatedAt = new Date
  try {
    const author = await AuthorModel.create({
      firstName: authorFromRequest.firstName,
      lastName: authorFromRequest.lastName,
      books: authorFromRequest.books,
      dob: authorFromRequest.dob,
      country: authorFromRequest.country
    })

    return res.status(200).json({
      message:"Author created successfully",
      success: true,
      author
    })
  } catch (error) {
    logger.error(`Error fetching author: ${error.message}`);
    console.error(error)
    return res.status(500).json({
      message: "An error occured while creating authors",
      success: false
    })
  }
}

const getAuthorById = async (req, res) => {
  try {
    logger.info("[get author by ID] => get author process started")
    const Id = req.params.id
    const author = await AuthorModel.findById(Id)
    if(!author){
      return res.status(404).json({
        message: "author not found",
        success: false,
      });
    }

    return res.status(200).json({
      message:"successfully",
      status: true,
      author
    })

  } catch (error) {
    logger.error(`Error fetching author: ${error.message}`);
    console.error(error)
    return res.status(500).json({
      message: "Server error",
      success: false
    })
  }
}

const updateAuthor = async (req, res) => {
  logger.info("[update autor by ID]")
  try {
    const Id = req.params.id
    const update = req.body
    const foundAuthor = await AuthorModel.findById(Id)

    if(!foundAuthor){
      return res.status(404).json({
        message: "Author not found",
        success: false,
      });
    }

    const authorUpdate = await AuthorModel.findByIdAndUpdate(Id, update, {
      new: true,
    })

    return res.status(200).json({ authorUpdate})

  } catch (error) {
    logger.error(`Error fetching author: ${error.message}`);
    console.error(error)
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}

const deleteAuthor = async (req, res) => {
  try {
    logger.info("[delete author by ID] => delete process started")
    const authorId = req.params.id
    const author = await AuthorModel.findById(authorId)

    if(!author){
      return res.status(404).json({
        message: "Author not found",
        success: false,
      });
    }

    const deletedAuthor = await AuthorModel.findByIdAndDelete(authorId)
    return res.status(200).json({
      message: "Author successfully deleted",
      success: true,
      deletedAuthor
    })
  } catch (error) {
    logger.error(`Error fetching author: ${error.message}`);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}

module.exports = {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};
