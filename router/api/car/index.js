const express = require("express");

const { authenticating, authorization } = require("../../../middlewares/auth");
const upload = require("../../../config/upload");
const { addCar, addCarImage, deleteCar } = require("../../../controllers/car");

const router = express.Router();

router.post("/", authenticating, authorization(["driver", "admin"]), addCar);
router.post(
  "/:carId",
  authenticating,
  authorization(["driver", "admin"]),
  upload.single("carImage"),
  addCarImage
);
router.delete("/:carId", authenticating, authorization(["driver"]), deleteCar);

module.exports = router;
