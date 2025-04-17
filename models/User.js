const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    expired: Boolean,
    hives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hive" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    token_firebase: String,
})

module.exports = mongoose.model("User", userSchema);
// In questo file, definiamo lo schema per il modello User.
// Utilizziamo Mongoose per definire lo schema e il modello.
// Lo schema include i campi name, email, password, expired, hives, createdAt, updatedAt e token_firebase.
// Il campo hives è un array di riferimenti a oggetti Hive.
// Il campo createdAt viene impostato automaticamente alla data corrente quando viene creato un nuovo documento.
// Il campo updatedAt viene aggiornato automaticamente alla data corrente quando il documento viene modificato.
// Infine, esportiamo il modello User in modo da poterlo utilizzare in altre parti dell'applicazione.
// In questo file, definiamo lo schema per il modello User.
// Utilizziamo Mongoose per definire lo schema e il modello.
// Lo schema include i campi name, email, password, expired, hives, createdAt, updatedAt e token_firebase.
// Il campo hives è un array di riferimenti a oggetti Hive.
// Il campo createdAt viene impostato automaticamente alla data corrente quando viene creato un nuovo documento.
// Il campo updatedAt viene aggiornato automaticamente alla data corrente quando il documento viene modificato.
// Infine, esportiamo il modello User in modo da poterlo utilizzare in altre parti dell'applicazione.
// In questo file, definiamo lo schema per il modello User.
// Utilizziamo Mongoose per definire lo schema e il modello.
// Lo schema include i campi name, email, password, expired, hives, createdAt, updatedAt e token_firebase.
// Il campo hives è un array di riferimenti a oggetti Hive.
// Il campo createdAt viene impostato automaticamente alla data corrente quando viene creato un nuovo documento.
// Il campo updatedAt viene aggiornato automaticamente alla data corrente quando il documento viene modificato.
// Infine, esportiamo il modello User in modo da poterlo utilizzare in altre parti dell'applicazione.