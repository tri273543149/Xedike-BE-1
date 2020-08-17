const validator = require("validator");
const _ = require("lodash");

const validateRateDriver = data => {
    let errors = {};
  
    data.rating = _.get(data, "rating", "");
    data.comment = _.get(data, "comment", "");
  
    if (validator.isEmpty(data.rating)) {
      errors.rating = "Bắt buộc nhập";
    } else if (parseInt(data.rating) < 1 || parseInt(data.rating) > 5) {
      errors.rating = "Đánh giá từ 1 đến 5";
    }
    if(validator.isEmpty(data.comment)){
      errors.comment = "Bắt buộc nhập";
    }
  
    return {
      isValid: _.isEmpty(errors),
      errors
    };
  };

module.exports = { validateRateDriver }