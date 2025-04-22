const Detection = require('../models/Detections');



exports.getDailyDetections = async (req, res) => {
    try {
        const { date, hiveId } = req.query;
    
        // Controllo obbligatorio per hiveId
        if (!hiveId) {
          return res.status(400).json({ message: 'Parametro hiveId obbligatorio' });
        }
    
        // Usa la data specificata o default a oggi
        const dateParam = date ? new Date(date) : new Date();
    
        // Calcola inizio e fine della giornata
        const startOfDay = new Date(dateParam.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateParam.setHours(23, 59, 59, 999));
    
        // Query con filtro obbligatorio per hive
        const detections = await Detection.find({
          hive: hiveId,
          date: { $gte: startOfDay, $lte: endOfDay }
        });
    
        res.json(detections);
      } catch (err) {
        console.error('Errore nel recupero delle detections:', err);
        res.status(500).json({ message: 'Errore del server' });
      }
};