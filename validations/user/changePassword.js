const validator = require("validator");
const _ = require("lodash");

const validateChangePassword = data => {
    let errors = {};
  
    data.oldPassword = _.get(data, "oldPassword", "");
    data.newPassword = _.get(data, "newPassword", "");
    data.newPassword2 = _.get(data, "newPassword2", "");
  
    if (validator.isEmpty(data.oldPassword)) {
      errors.oldPassword = "Bắt buộc nhập";
    }
  
    if (validator.isEmpty(data.newPassword)) {
      errors.newPassword = "Bắt buộc nhập";
    }
  
    if (validator.isEmpty(data.newPassword2)) {
      errors.newPassword2 = "Bắt buộc nhập";
    } else if (!validator.equals(data.newPassword, data.newPassword2)) {
      errors.newPassword2 = "Xác nhận mật khẩu không khớp";
    }
  
    return {
      isValid: _.isEmpty(errors),
      errors
    };
  };

  module.exports = { validateChangePassword };