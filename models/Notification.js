const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    title: String,
    content:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    read: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationSchema);
