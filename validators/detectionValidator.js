const { body } = require('express-validator');

const detectionValidatorRules = [
  body('temperature')
    .notEmpty().withMessage('Il campo temperature è obbligatorio'),
  body('humidity')
    .notEmpty().withMessage('Il campo humidity è obbligatorio'),
  body('weight')
    .notEmpty().withMessage('Il campo weight è obbligatorio'),
  body('hive')
    .notEmpty().withMessage('Il campo hive è obbligatorio')
    .isMongoId().withMessage('L\'ID dell\'arnia non è valido'),
];

module.exports = detectionValidatorRules;