const { param } = require('express-validator')
const requestValidation = require('./request.validation')

module.exports = [
    param('id')
        .isMongoId(),

    requestValidation
]