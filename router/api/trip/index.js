const express = require("express");
const {
  create,
  book,
  update,
  cancel,
  finish,
  remove,
  getTripById,
} = require("../../../controllers/trip");
const { authenticating, authorization } = require("../../../middlewares/auth");
const router = express.Router();

// ROUTES: api/trip

router.post("/", authenticating, authorization(["driver"]), create);
router.post(
  "/:tripId",
  authenticating,
  authorization(["passenger", "driver"]),
  book
);
router.put("/:tripId", authenticating, authorization(["driver"]), update);
router.post(
  "/cancel/:tripId",
  authenticating,
  authorization(["passenger", "driver"]),
  cancel
);
router.patch(
  "/:tripId",
  authenticating,
  authorization(["driver", "admin"]),
  finish
);
router.delete(
  "/:tripId",
  authenticating,
  authorization(["driver", "admin"]),
  remove
);
router.get("/:tripId", getTripById);

module.exports = router;
