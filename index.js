const express = require('express');
const connectDB = require('./config/db');
const hiveRoutes = require('./routes/hiveRoutes');
const userRoutes = require('./routes/userRoutes');
const configParamsRoutes = require('./routes/configParamsRoutes');
const detectionsRoutes = require('./routes/detectionRoutes');
const annotationRoutes = require('./routes/annotationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');



const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

app.use("/hives", hiveRoutes);
app.use("/users", userRoutes);
app.use("/config_params", configParamsRoutes);
app.use("/annotations", annotationRoutes);
app.use("/detections", detectionsRoutes);
app.use("/notifiactions", notificationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
