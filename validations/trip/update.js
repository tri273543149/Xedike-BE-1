const validator = require("validator");
const _ = require("lodash");

const validateUpdateTrip = (data) => {
  let errors = {};

  data.locationFrom = _.get(data, "locationFrom", "");
  data.locationTo = _.get(data, "locationTo", "");
  data.availableSeats = _.get(data, "availableSeats", "");

  if (validator.equals(data.locationTo, data.locationFrom)) {
    errors.locationTo = "Không được trùng điểm đón";
  }

  if (parseInt(data.availableSeats) < 1 || parseInt(data.availableSeats) > 10) {
    errors.availableSeats = "Số ghế từ 1 đến 10";
  }

  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};

module.exports = { validateUpdateTrip };
