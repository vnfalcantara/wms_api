const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    let error

    if (!errors.isEmpty()) {
        error = new Error(JSON.stringify(errors.array()))
        error.statusCode = 400

        return next(error)
    }

    next()
}