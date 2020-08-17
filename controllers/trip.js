const { User } = require("../models/user");
const { Trip } = require("../models/trip");
const { validateCreateTrip } = require("../validations/trip/create");
const { validateBookTrip } = require("../validations/trip/book");
const { validateUpdateTrip } = require("../validations/trip/update");

const create = (req, res) => {
  const { isValid, errors } = validateCreateTrip(req.body);
  if (!isValid) return res.status(400).json(errors);

  const driverId = req.user._id;
  User.findById(driverId)
    .then((driver) => {
      if (!driver) return Promise.reject({ err: "Driver does not exist" });
      const trip = { ...req.body, driverId };
      const newTrip = new Trip(trip);
      return newTrip.save();
    })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const book = (req, res) => {
  const { isValid, errors } = validateBookTrip(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { tripId } = req.params;
  const { numberOfBookingSeats } = req.body;
  const userId = req.user._id;
  Promise.all([User.findById(userId), Trip.findById(tripId)])
    .then((results) => {
      const passenger = results[0];
      const trip = results[1];
      if (!passenger) return Promise.reject({ err: "Passenger is not found" });
      if (!trip) return Promise.reject({ err: "Trip is not found" });
      if (numberOfBookingSeats > trip.availableSeats)
        return Promise.reject({
          numberOfBookingSeats: "Số ghế trống không phù hợp",
        });
      const index = trip.passengerIds.findIndex((i) => i == userId);
      if (index !== -1)
        return Promise.reject({
          numberOfBookingSeats: "Bạn đã tham gia chuyến đi này",
        });

      trip.availableSeats -= numberOfBookingSeats;
      trip.passengerIds.push(userId);
      trip.numberOfBookingSeatArr.push(numberOfBookingSeats);
      return trip.save();
    })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const update = (req, res) => {
  const { tripId } = req.params;
  const { isValid, errors } = validateUpdateTrip(req.body);
  if (!isValid) return res.status(400).json(errors);
  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) return res.status(400).json({ err: "Can not find trip" });
      const objRequest = req.body;
      Object.keys(objRequest).forEach((key) => {
        if (objRequest[key] != "") trip[key] = objRequest[key];
      });
      return trip.save();
    })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const cancel = (req, res) => {
  const { tripId } = req.params;
  const userId = req.user._id;
  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) return res.status(400).json({ err: "Can not find trip" });
      for (let i = 0; i < trip.passengerIds.length; i++) {
        if (trip.passengerIds[i]._id == userId) {
          trip.passengerIds.splice(i, 1);
          trip.availableSeats += parseInt(trip.numberOfBookingSeatArr[i]);
          trip.numberOfBookingSeatArr.splice(i, 1);
        }
      }
      trip.save();
    })
    .then((trip) => res.status(200).json({ msg: "Canceled" }))
    .catch((err) => res.status(400).json(err));
};

const finish = (req, res) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) return res.status(400).json({ err: "Can not find trip" });
      trip.isFinished = true;
      return trip.save();
    })
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const remove = (req, res) => {
  const _id = req.params.tripId;
  Trip.findOneAndDelete({ _id })
    .then((trip) => {
      if (!trip) return res.status(400).json({ err: "Trip is not found" });
      return res.status(200).json({ message: "Deleted" });
    })
    .catch((err) => res.status(400).json(err));
};

const getTripById = (req, res) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(400).json(err));
};

const getAllTrip = (req, res) => {
  Trip.find()
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  book,
  update,
  cancel,
  finish,
  remove,
  getTripById,
  getAllTrip,
};
