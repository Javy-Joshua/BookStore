const joi = require("joi")


const validateBookCreation = async(req, res, next) => {
    try {
       const schema = joi.object ({
        title: joi.string().min(5).max(255).trim().required(),
        shortDescription: joi.string().min(5).max(500).optional().trim(),
        longDescription: joi.string().min(10).optional().trim(),
        year: joi.number().integer().required().max(2024),
        isbn: joi.string().min(10).max(13).required(),
        price: joi.number().min(0).required(),
        createdAt: joi.date().default(Date.now),
        lastUpdatedAt: joi.date().default(Date.now)
    })
    await schema.validateAsync(req.body, {abortEarly: true})

    next()
    } catch (error) {
        return res.status(422).json({
            mesage:error.message,
            success: false
        })
    }
}

const validateBookUpdate = async(req, res, next) => {
    try {
        const schema = joi.object({
        title: joi.string().min(3).max(255).trim(),
        shortDescription: joi.string().min(10).max(500).trim(),
        longDescription: joi.string().min(10).trim(),
        year: joi.number().integer().max(2024),
        isbn: joi.string().min(10).max(13),
        price: joi.number().min(0)
        })

        await schema.validateAsync(req.body, {abortEarly: true})

        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    validateBookCreation,
    validateBookUpdate
}