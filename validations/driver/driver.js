const validator = require("validator");
const _ = require("lodash");

const validatePassportId = (data) => {
  const errors = {};
  data.passportId = _.get(data, "passportId", "");

  if (validator.isEmpty(data.passportId)) {
    errors.passportId = "Passport ID bắt buộc nhập";
  } else if (!validator.isLength(data.passportId, { min: 10, max: 10 })) {
    errors.passportId = "Đúng 10 ký tự";
  }

  return {
    isValid: !_.isEmpty(errors),
    errors,
  };
};

module.exports = { validatePassportId };
