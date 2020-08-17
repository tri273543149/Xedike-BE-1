const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../models/user");

validateUpdate = async (data) => {
  let errors = {};

  data.email = _.get(data, "email", "");
  data.fullName = _.get(data, "fullName", "");
  data.phone = _.get(data, "phone", "");
  data.sex = _.get(data, "sex", "");
  data.address = _.get(data, "address", "");

  if (data.email) {
    if (!validator.isEmail(data.email)) {
      errors.email = "Email không hợp lệ";
    } else {
      const userEmail = await User.findOne({ email: data.email });
      if (userEmail) {
        errors.email = "Email đã đăng ký";
      }
    }
  }

  if (data.fullName) {
    if (!validator.isLength(data.fullName, { min: 6, max: 20 })) {
      errors.fullName = "Họ tên từ 6 đến 20 ký tự";
    }
  }

  if (data.phone) {
    const userPhone = await User.findOne({ phone: data.phone });
    if (userPhone) {
      errors.phone = "Số điện thoại đã đăng ký";
    }
  }

  if (data.sex) {
    if (
      !validator.equals(data.sex, "male") &&
      !validator.equals(data.sex, "female") &&
      !validator.equals(data.sex, "other")
    ) {
      errors.sex = "Giới tính không hợp lệ";
    }
  }
  if (data.address) {
    if (!validator.isLength(data.address, { min: 10, max: 100 })) {
      errors.address = "Địa chỉ từ 10 đến 50 ký tự";
    }
  }

  return {
    isValid: _.isEmpty(errors),
    errors,
  };
};

module.exports = { validateUpdate };
