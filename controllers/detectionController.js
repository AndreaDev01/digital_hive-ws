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

exports.deleteDetection = async (req, res) => {
  try {
    const { detectionId } = req.params;

    const deleted = await Detection.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Detection not found' });
    }

    res.status(200).json({ message: 'Detection deleted successfully' });
  } catch (error) {
    console.error('Error deleting detection:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
