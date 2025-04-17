const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');


dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connessione a MongoDB riuscita');

  // Rimuove tutti gli utenti esistenti
  await User.deleteMany({});

  // Crea 10 utenti fittizi
  const users = Array.from({ length: 10 }, () => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    expired:false,
    token_firebase: faker.string.uuid(),
    hives: [],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  // Inserisce gli utenti nel database
  await User.insertMany(users);

  console.log('✅ Database popolato con utenti fittizi');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('❌ Errore durante la connessione a MongoDB:', err);
  process.exit(1);
});
