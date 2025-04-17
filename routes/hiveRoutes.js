const express = require('express');
const router = express.Router();
const HiveController = require('../controllers/hiveController');
const hiveValidationRules = require('../validators/hiveValidator');
const validate = require('../middlewares/validate');
// In questo file, definiamo le rotte per il modello Hive.
// Importiamo express e creiamo un router.
// Importiamo il controller HiveController e le regole di validazione hiveValidationRules.
// Importiamo anche il middleware di validazione validate.
// Definiamo le rotte per le operazioni CRUD sul modello Hive.
// La rotta GET '/' restituisce tutti gli hives.
// La rotta POST '/' crea un nuovo hive.
// Utilizziamo le regole di validazione e il middleware di validazione per garantire che i dati inviati siano validi.


router.get('/', HiveController.getHives);
router.post('/', hiveValidationRules, validate, HiveController.createHive);

module.exports = router;