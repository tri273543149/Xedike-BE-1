const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  registerDate: { type: Date, default: new Date() },
  numberOfTrips: { type: Number },
  numberOfKms: { type: Number },
  isActive: { type: Boolean, default: true },
  avatar: { type: String },
  sex: { type: String },
  address: { type: String },
  company: { type: String },
  dOB: { type: String },
  desc: { type: String },
});

const User = new mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
