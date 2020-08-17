const mongoose = require("mongoose");
const { CarSchema } = require("./car");

const DriverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  passportId: { type: String, required: true },
  passengerRate: { type: Array, default: ["5"] },
  passengerComments: { type: Array, default: [""]},
  carInformation: { type: [CarSchema] },
});

const Driver = new mongoose.model("Driver", DriverSchema);

module.exports = { Driver, DriverSchema };
