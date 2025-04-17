const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connesso');
  } catch (err) {
    console.error('❌ Errore connessione MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// In questo file, configuriamo la connessione a MongoDB utilizzando Mongoose.
// Importiamo mongoose e dotenv per gestire le variabili d'ambiente.
// Creiamo una funzione connectDB che si occupa di connettersi al database.
// Utilizziamo async/await per gestire la connessione in modo asincrono.
// In caso di errore, stampiamo un messaggio di errore e terminiamo il processo.