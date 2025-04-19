const Hive = require("../models/Hive");
const Detection = require("../models/Detections");


exports.getDetections = async (req, res) => {
  const { hiveId } = req.params;
  const detections = await Detection.find({hive:hiveId});
  res.json(detections);
};


exports.createDetection = async (req, res) => {
  try {
    const detection = new Detection(req.body);
    const savedDetection = await detection.save();

    // aggiorna il campo hives dell'utente
    await Hive.findByIdAndUpdate(
      req.body.hive,
      { $push: { hives: savedDetection._id } },
      { new: true }
    );

    res.status(201).json(savedDetection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};