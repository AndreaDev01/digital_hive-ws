const { body } = require('express-validator');

const annotationValitationRules = [
  body('note')
    .notEmpty().withMessage('Il campo note è obbligatorio')
    .isLength({ min: 3 }).withMessage('Il note deve contenere almeno 3 caratteri'),
  body('hive')
    .notEmpty().withMessage('Il campo hive è obbligatorio')
    .isMongoId().withMessage('L\'ID hive non è valido'),
];

module.exports = annotationValitationRules;

// In questo file, definiamo le regole di validazione per il modello Hive.
// Utilizziamo express-validator per definire le regole di validazione.
// Le regole includono la validazione dei campi name, description e user.
// Il campo name deve essere obbligatorio e contenere almeno 3 caratteri.
// Il campo description deve essere obbligatorio e contenere almeno 5 caratteri.
// Il campo user deve essere obbligatorio e deve essere un ID MongoDB valido.
// Infine, esportiamo le regole di validazione in modo da poterle utilizzare in altre parti dell'applicazione.