const { body } = require('express-validator');

const configParamsValidationRules = [
  body('temp_min')
    .notEmpty().withMessage('Il campo temp_min è obbligatorio'),
  body('temp_max')
    .notEmpty().withMessage('Il campo temp_max è obbligatorio'),
    body('hum_min')
    .notEmpty().withMessage('Il campo hum_min è obbligatorio'),
    body('hum_max')
    .notEmpty().withMessage('Il campo hum_max è obbligatorio'),
    body('weigth_min')
    .notEmpty().withMessage('Il campo weigth_min è obbligatorio'),
    body('weigth_max')
    .notEmpty().withMessage('Il campo weigth_max è obbligatorio'),
      
    body('userId')
    .notEmpty().withMessage('Il campo userId è obbligatorio')
    .isMongoId().withMessage('L\'ID utente non è valido'),
];

module.exports = configParamsValidationRules;