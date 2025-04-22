const Detection = require('../models/Detections');
const mongoose = require('mongoose');



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

exports.getWeeklyAverages = async (req, res) => {
    try {
      const { date, hiveId } = req.query;
  
      // 1. Controllo se hiveId è presente (obbligatorio)
      if (!hiveId) {
        return res.status(400).json({ message: 'hiveId is required' });
      }
  
      // 2. Prende la data fornita o oggi
      const base = new Date(date || Date.now());
  
      // 3. Calcola inizio e fine settimana (lunedì - domenica)
      const monday = new Date(base);
      monday.setDate(base.getDate() - ((base.getDay() + 6) % 7));
      monday.setHours(0, 0, 0, 0);
  
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);
  
      // 4. Aggrega le medie per ogni giorno
      const dailyAverages = await Detection.aggregate([
        {
          $match: {
            hive: new mongoose.Types.ObjectId(hiveId),
            date: { $gte: monday, $lte: sunday }
          }
        },
        {
          $group: {
            _id: {
              day: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
            },
            avgTemperature: { $avg: '$temperature' },
            avgHumidity: { $avg: '$humidity' },
            avgWeight: { $avg: '$weight' }
          }
        },
        { $sort: { '_id.day': 1 } }
      ]);
  
      res.json(dailyAverages);
    } catch (error) {
      console.error('Error in getWeeklyAverages:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };