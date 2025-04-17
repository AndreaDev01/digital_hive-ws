const Hive = require("../models/Hive");

// get hives
exports.getHives = async (req, res) => {
  const hives = await Hive.find();
  res.json(hives);
};