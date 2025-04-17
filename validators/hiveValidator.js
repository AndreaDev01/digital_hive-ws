const { body } = require('express-validator');

const hiveValidationRules = [
  body('name')
    .notEmpty().withMessage('Il campo name è obbligatorio')
    .isLength({ min: 3 }).withMessage('Il nome deve contenere almeno 3 caratteri'),
  body('description')
    .notEmpty().withMessage('Il campo description è obbligatorio')
    .isLength({ min: 5 }).withMessage('La descrizione deve contenere almeno 5 caratteri'),
  body('user')
    .notEmpty().withMessage('Il campo user è obbligatorio')
    .isMongoId().withMessage('L\'ID utente non è valido'),
];

module.exports = hiveValidationRules;

// In questo file, definiamo le regole di validazione per il modello Hive.
// Utilizziamo express-validator per definire le regole di validazione.
// Le regole includono la validazione dei campi name, description e user.
// Il campo name deve essere obbligatorio e contenere almeno 3 caratteri.
// Il campo description deve essere obbligatorio e contenere almeno 5 caratteri.
// Il campo user deve essere obbligatorio e deve essere un ID MongoDB valido.
// Infine, esportiamo le regole di validazione in modo da poterle utilizzare in altre parti dell'applicazione.