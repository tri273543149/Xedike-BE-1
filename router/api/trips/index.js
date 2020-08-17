const express = require("express");
const { getAllTrip } = require("../../../controllers/trip");
const { getUserTrips } = require("../../../controllers/user");
const { getDriverTrips } = require("../../../controllers/driver");
const { authenticating, authorization } = require("../../../middlewares/auth");
const router = express.Router();

// ROUTES: /api/users

router.get("/", getAllTrip);
router.get(
  "/passenger/:userId",
  authenticating,
  authorization(["passenger", "admin"]),
  getUserTrips
);
router.get(
  "/driver/:userId",
  authenticating,
  authorization(["driver", "admin"]),
  getDriverTrips
);

module.exports = router;
