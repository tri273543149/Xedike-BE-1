const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  manufacturingYear: { type: Date, required: true },
  licensePlate: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },

  carImage: { type: String },
});

const Car = new mongoose.model("Car", CarSchema);

module.exports = { Car, CarSchema };
