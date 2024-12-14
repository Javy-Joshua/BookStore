const express = require("express")
const middleware = require("../validations/author.validator")
const controller = require("../controllers/author.controller")

const router = express.Router()

router.get("/", controller.getAuthors)

router.get("/:id", controller.getAuthorById)

router.post("/", middleware.validateAuthorCreation, controller.createAuthor)

router.put("/:id", middleware.validateAuthorUpdate, controller.updateAuthor)

router.delete("/:id", controller.deleteAuthor)

module.exports = router