const { body } = require('express-validator')
const requestValidation = require('./request.validation')

module.exports = {
    login: [
        body('email')
            .isEmail(),

        body('password')
            .isString()
            .isLength({ min: 3 }),

        requestValidation
    ],

    create: [
        body('name')
            .isString()
            .notEmpty(),

        body('email')
            .isEmail(),

        body('password')
            .isString()
            .isLength({ min: 3 }),

        body('cpf')
            .notEmpty()
            .isLength({ min: 11, max: 11 }),

        requestValidation
    ]
}