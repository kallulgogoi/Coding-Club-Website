const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  saveSubscription,
  getUserNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const router = express.Router();

router.post("/subscribe", protect, saveSubscription);
router.get("/", protect, getUserNotifications);
router.put("/:id/read", protect, markAsRead);

module.exports = router;
