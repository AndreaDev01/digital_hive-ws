const User = require('../models/User');
const configParams = require('../models/ConfigParams');


exports.getConfigParams = async (req, res) => {
        const { userId } = req.params;
      const hives = await configParams.find({
        user: userId,
      });
      res.json(hives);
}

exports.createConfigParams = async (req, res) => {
  try {

    const { userId } = req.body;

    // 1. Controlla se esiste già una config per questo utente
    const existingConfig = await configParams.findOne({ userId: userId });
    
    if (existingConfig) {
      return res.status(400).json({
        message: 'Questo utente ha già una configurazione attiva.',
      });
    }

    const config = new configParams(req.body);
    const savedConfig = await config.save();

    // aggiorna il campo hives dell'utente
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { hives: savedConfig._id } },
      { new: true }
    );

    res.status(201).json(savedConfig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};