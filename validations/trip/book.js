const validator = require("validator");
const _ = require("lodash");

const validateBookTrip = (data) => {
  let errors = {};

  data.numberOfBookingSeats = _.get(data, "numberOfBookingSeats", "");

  if (validator.isEmpty(data.numberOfBookingSeats)) {
    errors.numberOfBookingSeats = "Number of booking seat is required";
  } else if (parseInt(data.numberOfBookingSeats) < 1) {
    errors.numberOfBookingSeats = "Number of booking seat is at leat a seat";
  }

  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};

module.exports = { validateBookTrip };
