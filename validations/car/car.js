const validator = require("validator");
const _ = require("lodash");

const validateCarInfo = data => {
  let errors = {};

  data.brand = _.get(data, "brand", "");
  data.model = _.get(data, "model", "");
  data.manufacturingYear = _.get(data, "manufacturingYear", "");
  data.licensePlate = _.get(data, "licensePlate", "");
  data.numberOfSeats = _.get(data, "numberOfSeats", "");

  if (validator.isEmpty(data.brand)) {
    errors.brand = "Bắt buộc nhập";
  } else if (!validator.isLength(data.brand, { min: 6, max: 10 })) {
    errors.brand = "Tên xe từ 6 đến 10 ký tự";
  }

  if (validator.isEmpty(data.model)) {
    errors.model = "Bắt buộc nhập";
  } else if (!validator.isLength(data.model, { min: 6, max: 10 })) {
    errors.model = "Hãng xe từ 6 đến 10 ký tự";
  }

  if (validator.isEmpty(data.manufacturingYear)) {
    errors.manufacturingYear = "Bắt buộc nhập";
  }

  if (validator.isEmpty(data.licensePlate)) {
    errors.licensePlate = "Bắt buộc nhập";
  } else if (!validator.isLength(data.licensePlate, { min: 6, max: 10 })) {
    errors.licensePlate = "Bản số xe từ 6 đến 10 ký tự";
  }

  if (validator.isEmpty(data.numberOfSeats)) {
    errors.numberOfSeats = "Bắt buộc nhập";
  }

  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = {
  validateCarInfo
};
