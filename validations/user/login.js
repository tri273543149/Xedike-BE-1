const validator = require("validator");
const _ = require("lodash");

const validateLogin = data => {
    let errors = {};
  
    data.email = _.get(data, "email", "");
    data.password = _.get(data, "password", "");
  
    if (validator.isEmpty(data.email)) {
      errors.email = "Bắt buộc nhập";
    }
  
    if (validator.isEmpty(data.password)) {
      errors.password = "Bắt buộc nhập";
    }
  
    return {
      isValid: _.isEmpty(errors),
      errors
    };
  };

module.exports = { validateLogin };