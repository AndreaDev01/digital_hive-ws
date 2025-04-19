const { body } = require('express-validator');

const userValidationRules = [
  body('email')
    .notEmpty().withMessage('Il campo email è obbligatorio')
    .isLength({ min: 3 }).withMessage('Il email deve contenere almeno 3 caratteri'),
    body('password')
    .notEmpty().withMessage('Il campo password è obbligatorio')
    .isLength({ min: 3 }).withMessage('la password deve contenere almeno 3 caratteri'),
];

module.exports = userValidationRules;