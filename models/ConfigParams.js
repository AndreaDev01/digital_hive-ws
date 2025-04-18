const mongoose = require("mongoose");


const configSchema = new mongoose.Schema({
    temp_min: Number,
    temp_max: Number,
    hum_min: Number,
    hum_max: Number,
    weigth_min: Number,
    weigth_max: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("configParams", configSchema);
// In this code, we define a Mongoose schema for the configuration parameters.
// The schema includes fields for minimum and maximum temperature, humidity, and weight.
// Each of these fields is of type Number.
// Additionally, we include a userId field that references the User model.
// This allows us to associate the configuration parameters with a specific user.
// Finally, we export the model so that it can be used in other parts of the application.
// This model can be used to create, read, update, and delete configuration parameters in the MongoDB database.
// The model can be used in the application to manage configuration parameters for different users.
// The userId field is a reference to the User model, allowing us to associate configuration parameters with a specific user.
// This is useful for applications where different users may have different configuration settings.