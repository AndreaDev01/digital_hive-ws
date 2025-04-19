const Hive = require("../models/Hive");
const Annotation = require("../models/Annotation");

exports.getAnnotations = async (req, res) => {
  const { hiveId } = req.params;
  const annotations = await Annotation.find({hive:hiveId});
  res.json(annotations);
};

exports.createAnnotation = async (req, res) => {
  try {
    const annotation = new Annotation(req.body);
    const savedAnnotation = await annotation.save();
    res.status(201).json(savedAnnotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnnotation = async (req, res) => {
    const { annotationId } = req.params;
    try {
        const updatedAnnotation = await Annotation.findByIdAndUpdate(
            annotationId,
          req.body,
          { new: true, runValidators: true } // restituisce l'oggetto aggiornato e applica le validazioni
        );
    
        if (!updatedAnnotation) {
          return res.status(404).json({ message: 'Annotation not found' });
        }
    
        res.json(updatedAnnotation);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.deleteAnnotation = async (req, res) => {
  try {
    const { annotationId } = req.params;

    const deleted = await Detection.findByIdAndDelete(annotationId);

    if (!deleted) {
      return res.status(404).json({ message: 'Annotation not found' });
    }

    res.status(200).json({ message: 'Annotation deleted successfully' });
  } catch (error) {
    console.error('Error deleting annotation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};