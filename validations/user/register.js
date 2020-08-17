const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../models/user");

validateRegister = async (data) => {
  let errors = {};

  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.confirmPassword = _.get(data, "confirmPassword", "");
  data.userType = _.get(data, "userType", "");
  data.phone = _.get(data, "phone", "");
  data.fullName = _.get(data, "fullName", "");

  if (validator.isEmpty(data.email)) {
    errors.email = "Bắt buộc nhập";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email không hợp lệ";
  } else {
    const userEmail = await User.findOne({ email: data.email });
    if (userEmail) {
      errors.email = "Email đã đăng ký";
    }
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Bắt buộc nhập";
  } else if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Nhập từ 6 đến 20 ký tự";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Bắt buộc nhập";
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }

  if (validator.isEmpty(data.fullName)) {
    errors.fullName = "Bắt buộc nhập";
  } else if (!validator.isLength(data.fullName, { min: 6, max: 20 })) {
    errors.fullName = "Nhập từ 6 đến 20 ký tự";
  }

  if (validator.isEmpty(data.userType)) {
    errors.userType = "Bắt buộc nhập";
  } else if (
    !validator.equals(data.userType, "passenger") &&
    !validator.equals(data.userType, "driver") &&
    !validator.equals(data.userType, "admin")
  ) {
    errors.userType = "Hành khách hoặc tài xế";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Bắt buộc nhập";
  } else {
    const userPhone = await User.findOne({ phone: data.phone });
    if (userPhone) {
      errors.phone = "Số điện thoại đã đăng ký";
    }
  }
  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};

module.exports = { validateRegister };
