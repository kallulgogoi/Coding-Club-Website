const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/soloRegistration.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.post("/:eventId", protect, registrationController.registerSolo);
router.get("/my", protect, registrationController.getMyRegistrations);
router.get(
  "/event/:eventId",
  protect,
  adminOnly,
  registrationController.getEventRegistrations,
);

module.exports = router;
