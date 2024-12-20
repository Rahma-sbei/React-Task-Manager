const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/getEvents", eventController.getEvents);
router.post("/createEvents", eventController.createEvent);

module.exports = router;
