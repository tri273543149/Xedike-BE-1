const validator = require("validator");
const _ = require("lodash");

const validateCreateTrip = data => {
    let errors = {};
  
    data.locationFrom = _.get(data, "locationFrom", "");
    data.locationTo = _.get(data, "locationTo", "");
    data.availableSeats = _.get(data, "availableSeats", "");
    data.startTime = _.get(data, "startTime", "");
    data.fee = _.get(data, "fee", "");
  
    if (validator.isEmpty(data.locationFrom)) {
      errors.locationFrom = "Bắt buộc nhập";
    }
  
    if (validator.isEmpty(data.locationTo)) {
      errors.locationTo = "Bắt buộc nhập";
    } else if (validator.equals(data.locationTo, data.locationFrom)) {
      errors.locationTo = "Không được trùng điểm đón";
    }
  
    if (validator.isEmpty(data.availableSeats)) {
      errors.availableSeats = "Bắt buộc nhập";
    } else if (
      parseInt(data.availableSeats) < 1 ||
      parseInt(data.availableSeats) > 10
    ) {
      errors.availableSeats = "Số ghế từ 1 đến 10";
    }
  
    if (validator.isEmpty(data.fee)) {
      errors.fee = "Bắt buộc nhập";
    }

    if (validator.isEmpty(data.startTime)) {
      errors.startTime = "Bắt buộc nhập";
    }
  
    return {
      isValid: _.isEmpty(errors),
      errors
    };
  };

  module.exports = { validateCreateTrip };