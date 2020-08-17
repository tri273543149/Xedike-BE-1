const { Driver } = require("../models/driver");
const { validatePassportId } = require("../validations/driver/driver");
const { Trip } = require("../models/trip");

const create = (req, res) => {
  const { _id } = req.user;
  Driver.findOne({ userId: _id })
    .then((driver) => {
      if (driver) return Promise.reject({ msg: "Profile created" });
      const newDriver = new Driver({
        userId: _id,
        passportId: "none",
      });
      return newDriver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

const update = (req, res) => {
  const { isValid, errors } = validatePassportId(req.body);
  if (isValid) return res.status(400).json(errors);
  const { _id } = req.user;
  Driver.findOne({ userId: _id })
    .then((driver) => {
      if (!driver) return res.status(400).json({ err: "Driver is not found" });
      const objRequest = req.body;
      Object.keys(objRequest).forEach((key) => {
        if (objRequest[key] != "") {
          driver[key] = objRequest[key];
        }
      });
      return driver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

const deleteDriver = (req, res) => {
  const _id = req.params.driverId;
  Driver.findOneAndDelete({ _id })
    .then((driver) => {
      if (!driver)
        return res.status(400).json({ err: "Driver does not exist" });
      return res.status(200).json({ msg: "Deleted" });
    })
    .catch((err) => res.status(400).json(err));
};

const getDriver = (req, res) => {
  const userId = req.params.driverId;
  Driver.findOne({ userId })
    .then((driver) => {
      if (!driver) return res.status(400).json({ err: "Can not find driver" });
      return res.status(200).json(driver);
    })
    .catch((error) => res.status(400).json(error));
};

const getDriverTrips = (req, res) => {
  const _id = req.params.userId;
  Trip.find({ driverId: _id })
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(400).json(err));
};

const getAllDriver = (req, res) => {
  Driver.find()
    .then((drivers) => res.status(200).json(drivers))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  update,
  deleteDriver,
  getDriver,
  getDriverTrips,
  getAllDriver,
};
