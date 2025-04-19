const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive' },
  date: { type: Date, default: Date.now },
  temperature: Number,
  humidity: Number,
  weight: Number,
});
module.exports = mongoose.model('Detection', detectionSchema);