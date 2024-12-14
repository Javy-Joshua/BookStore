const joi = require('joi')

const validateAuthorCreation = async (req, res, next) => {
    try {
        const schema = joi.object({
          firstName: joi.string().min(4).required().trim().required(),
          lastName: joi.string().min(4).required().trim().required(),
          dob: joi
            .date()
            .greater("1-1-1930")
            .less("1-1-2026")
            .required(),  // mm/dd/yyyy
          country: joi.string().trim().optional(),
          books: joi.array().items(joi.string()).optional(),
          createdAt: joi.date().default(Date.now),
          lastUpdatedAt: joi.date().default(Date.now),
        });
            await schema.validateAsync(req.body, {abortEarly: true})
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            status: false
        })
    }
}

const validateAuthorUpdate = async (req, res, next) => {
 try {
     const schema = joi.object({
       firstName: joi.string().min(5).trim().optional(),
       lastName: joi.string().min(5).trim().optional(),
       dob: joi.date().greater("1-1-1960").less("1-1-2026"),
       books: joi.array().items(joi.string()),
     });
     await schema.validateAsync(req.body, { abortEarly: true });
     next();
 } catch (error) {
    return res.status(422).json({
        message: error.message,
        status: false
    })
 }
}

module.exports = {
    validateAuthorCreation,
    validateAuthorUpdate
}

