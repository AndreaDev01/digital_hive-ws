const mongoose = require("mongoose");


const configSchema = new mongoose.Schema({
    temp_min: Number,
    temp_max: Number,
    hum_min: Number,
    hum_max: Number,
    weigth_min: Number,
    weigth_max: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("ConfigParams", configSchema);
// In