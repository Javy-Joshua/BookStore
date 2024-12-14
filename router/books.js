const express = require("express")
const middleware = require("../validations/book.validator")
const controller = require("../controllers/book.controller")


router = express.Router()

router.post("/", middleware.validateBookCreation, controller.createBook)


router.get("/", controller.getALLBooks)

router.get("/:id", controller.getBookById)

router.put("/:id", middleware.validateBookUpdate, controller.updateBook)

router.delete("/:id", controller.deleteBook)

module.exports = router