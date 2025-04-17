const express = require('express');
const connectDB = require('./config/db');
const hiveRoutes = require('./routes/hiveRoutes');
const userRoutes = require('./routes/userRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

app.use("/hives", hiveRoutes);
app.use("/users", userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
