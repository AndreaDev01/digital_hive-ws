const Hive = require("../models/Hive");
const User = require("../models/User");

// get hives
exports.getHives = async (req, res) => {
  const { userId } = req.params;
  const hives = await Hive.find({user:userId});
  res.json(hives);
};

exports.createHive = async (req, res) => {
  try {
    const hive = new Hive(req.body);
    const savedHive = await hive.save();

    // aggiorna il campo hives dell'utente
    await User.findByIdAndUpdate(
      req.body.user,
      { $push: { hives: savedHive._id } },
      { new: true }
    );

    res.status(201).json(savedHive);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};