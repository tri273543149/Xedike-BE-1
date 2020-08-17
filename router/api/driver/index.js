const express = require("express");

const { authenticating, authorization } = require("../../../middlewares/auth");

const {
  create,
  update,
  deleteDriver,
  getDriver,
} = require("../../../controllers/driver");
const { rateDriver } = require("../../../controllers/user");

const router = express.Router();

// routes: api/driver

router.post("/", authenticating, authorization(["driver"]), create);
router.put("/", authenticating, authorization(["driver"]), update);
router.put(
  "/:driverId",
  authenticating,
  authorization(["passenger"]),
  rateDriver
);
router.delete(
  "/:driverId",
  authenticating,
  authorization(["admin"]),
  deleteDriver
);
router.get("/:driverId", authenticating, getDriver);

module.exports = router;
