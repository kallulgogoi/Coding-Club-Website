const express = require("express");
const router = express.Router();

const teamController = require("../controllers/teamRegistration.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");
router.post("/:eventId", protect, teamController.createTeam);
router.get("/my", protect, teamController.getMyTeams);
router.get("/event/:eventId", protect, adminOnly, teamController.getEventTeams); // only admin can see all teams of an event

module.exports = router;
