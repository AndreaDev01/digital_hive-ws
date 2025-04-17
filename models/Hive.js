const mongoose = require("mongoose");


const hiveSchema = new mongoose.Schema({
    name:String,
    description:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


module.exports = mongoose.model("Hive", hiveSchema);