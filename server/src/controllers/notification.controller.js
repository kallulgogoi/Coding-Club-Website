const webpush = require("../utils/webPush");
const PushSubscription = require("../models/pushSubscription.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");

exports.saveSubscription = async (req, res) => {
  try {
    const subscription = req.body;

    await PushSubscription.findOneAndUpdate(
      { user: req.user.id },
      { subscription },
      { upsert: true },
    );

    res.json({ message: "Subscription saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendNotification = async (userId, title, message) => {
  try {
    // Save to database so user can see it later in the app
    await Notification.create({
      user: userId,
      title,
      message,
    });

    const sub = await PushSubscription.findOne({ user: userId });
    if (!sub) return;

    const payload = JSON.stringify({ title, message });
    await webpush.sendNotification(sub.subscription, payload);
  } catch (error) {
    console.error("Push Error:", error.message);
  }
};

exports.sendNotificationToAll = async (title, message) => {
  try {
    const users = await User.find().select("_id");

    // Save to database for all users
    const notifications = users.map((user) => ({
      user: user._id,
      title,
      message,
    }));
    await Notification.insertMany(notifications);

    const subs = await PushSubscription.find({});
    const payload = JSON.stringify({ title, message });

    const promises = subs.map((sub) =>
      webpush.sendNotification(sub.subscription, payload).catch(() => null),
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Broadcast Push Error:", error.message);
  }
};

// Get notifications for the logged-in user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mark a specific notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: "Invalid notification ID" });
  }
};
