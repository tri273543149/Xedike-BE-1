const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  locationFrom: { type: String, required: true },
  locationTo: { type: String, required: true },
  startTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  fee: { type: Number, required: true },
  isFinished: { type: Boolean, default: false },
  passengerIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  numberOfBookingSeatArr: { type: Array },
});

const Trip = new mongoose.model("Trip", TripSchema);

module.exports = { Trip, TripSchema };
