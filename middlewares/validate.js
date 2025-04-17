const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
// In questo file, definiamo un middleware di validazione per le richieste.
// Utilizziamo express-validator per gestire gli errori di validazione.
// La funzione validate controlla se ci sono errori di validazione nella richiesta.
// Se ci sono errori, restituiamo una risposta con codice di stato 400 e un array di errori.
// Se non ci sono errori, chiamiamo la funzione next() per passare al middleware successivo.
// Questo middleware può essere utilizzato in qualsiasi parte dell'applicazione per garantire che le richieste siano valide prima di procedere con la logica del controller.