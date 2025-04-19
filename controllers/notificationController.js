const User = require("../models/User");
const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  const notifications = await Notification.find({user:userId});
  res.json(notifications);
};

exports.markAsRead = async (req, res) => {
    try {
      const { notificationId } = req.params;
  
      const updatedNotification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
      );
  
      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({
        message: 'Notification marked as read',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.deleteNotification = async (req, res) => {
    try {
      const { notificationId } = req.params;
  
      const deleted = await Notification.findByIdAndDelete(notificationId);
  
      if (!deleted) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };