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

  exports.getMonthlyWeeklyAverages = async (req, res) => {
    try {
      const { month, hiveId } = req.query;
  
      // 1. Controlla hiveId obbligatorio
      if (!hiveId) {
        return res.status(400).json({ message: 'hiveId is required' });
      }
  
      // 2. Data base: primo giorno del mese fornito o mese corrente
      const baseDate = month ? new Date(`${month}-01`) : new Date();
      const year = baseDate.getFullYear();
      const monthIndex = baseDate.getMonth();
  
      // 3. Inizio mese
      const startOfMonth = new Date(year, monthIndex, 1);
      startOfMonth.setHours(0, 0, 0, 0);
  
      // 4. Fine mese
      const endOfMonth = new Date(year, monthIndex + 1, 0); // ultimo giorno del mese
      endOfMonth.setHours(23, 59, 59, 999);
  
      // 5. Aggregazione settimanale
      const weeklyAverages = await Detection.aggregate([
        {
          $match: {
            hive: new mongoose.Types.ObjectId(hiveId),
            date: { $gte: startOfMonth, $lte: endOfMonth }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              week: { $isoWeek: "$date" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            avgWeight: { $avg: "$weight" }
          }
        },
        { $sort: { "_id.year": 1, "_id.week": 1 } }
      ]);
  
      res.json(weeklyAverages);
    } catch (err) {
      console.error('Error calculating monthly weekly averages:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };


  exports.getDailyAverages = async (req, res) => {
    try {
      const { month, hiveId } = req.query;
  
      // 1. Controlla se hiveId è presente
      if (!hiveId) {
        return res.status(400).json({ message: 'hiveId is required' });
      }
  
      // 2. Data base: primo giorno del mese fornito o mese corrente
      const baseDate = month ? new Date(`${month}-01`) : new Date();
      const year = baseDate.getFullYear();
      const monthIndex = baseDate.getMonth();
  
      // 3. Inizio mese
      const startOfMonth = new Date(year, monthIndex, 1);
      startOfMonth.setHours(0, 0, 0, 0);
  
      // 4. Fine mese
      const endOfMonth = new Date(year, monthIndex + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
  
      // 5. Aggregazione giornaliera
      const dailyAverages = await Detection.aggregate([
        {
          $match: {
            hive: new mongoose.Types.ObjectId(hiveId),
            date: { $gte: startOfMonth, $lte: endOfMonth }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            avgWeight: { $avg: "$weight" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
      ]);
  
      res.json(dailyAverages);
    } catch (err) {
      console.error('Error calculating daily averages:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getMonthlyAverages = async (req, res) => {
    try {
      const { year, hiveId } = req.query;
  
      // 1. Controlla se hiveId è presente
      if (!hiveId) {
        return res.status(400).json({ message: 'hiveId is required' });
      }
  
      // 2. Anno base: se fornito, usalo, altrimenti usa l'anno corrente
      const baseYear = year ? parseInt(year) : new Date().getFullYear();
  
      // 3. Inizio anno (1 gennaio)
      const startOfYear = new Date(baseYear, 0, 1);
      startOfYear.setHours(0, 0, 0, 0);
  
      // 4. Fine anno (31 dicembre)
      const endOfYear = new Date(baseYear, 11, 31);
      endOfYear.setHours(23, 59, 59, 999);
  
      // 5. Aggregazione mensile
      const monthlyAverages = await Detection.aggregate([
        {
          $match: {
            hive: new mongoose.Types.ObjectId(hiveId),
            date: { $gte: startOfYear, $lte: endOfYear }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            avgWeight: { $avg: "$weight" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
  
      res.json(monthlyAverages);
    } catch (err) {
      console.error('Error calculating monthly averages:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };