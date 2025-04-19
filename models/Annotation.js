const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    note: String,
    hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Annotation', annotationSchema);
// In questo file, definiamo il modello Annotation utilizzando Mongoose.
// Creiamo uno schema per le annotazioni, che include i campi node, hive e date.
// Il campo node è una stringa che rappresenta il nodo associato all'annotazione.
// Il campo hive è un riferimento a un documento Hive, utilizzando l'ID del documento.
// Il campo date è una data che rappresenta la data di creazione dell'annotazione, con un valore predefinito impostato su Date.now().
// Infine, esportiamo il modello Annotation in modo da poterlo utilizzare in altre parti dell'applicazione.

