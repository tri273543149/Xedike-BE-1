const { Driver } = require("../models/driver");
const { Car } = require("../models/car");
const { validateCarInfo } = require("../validations/car/car");

const addCar = (req, res) => {
  const { isValid, errors } = validateCarInfo(req.body);
  if (!isValid) return res.status(400).json(errors);

  const userId = req.user._id;
  Driver.findOne({ userId })
    .then((driver) => {
      if (!driver)
        return res.status(400).json({ err: "Driver does not exist" });
      const newCar = new Car(req.body);
      driver.carInformation.push(newCar);
      return driver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

const addCarImage = (req, res) => {
  const userId = req.user._id;
  const { carId } = req.params;
  const carImage = req.file.path;

  Driver.findOne({ userId })
    .then((driver) => {
      if (!driver)
        return res.status(400).json({ err: "Driver does not exist" });
      let carIndex = -1;
      driver.carInformation.find((car, index) => {
        if (car._id == carId) carIndex = index;
      });
      if (carIndex === -1)
        return res.status(400).json({ error: "Car does not exist" });
      driver.carInformation[carIndex].carImage = carImage;
      return driver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

const deleteCar = (req, res) => {
  const { carId } = req.params;
  const userId = req.user._id;

  Driver.findOne({ userId })
    .then((driver) => {
      if (!driver)
        return res.status(400).json({ err: "Driver does not exist" });
      for (let i = 0; i < driver.carInformation.length; i++) {
        if (driver.carInformation[i]._id == carId)
          driver.carInformation.splice(i, 1);
      }
      return driver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

module.exports = { addCar, addCarImage, deleteCar };
