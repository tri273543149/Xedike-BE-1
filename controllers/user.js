const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

const { validateRegister } = require("../validations/user/register");
const { validateLogin } = require("../validations/user/login");
const { validateUpdate } = require("../validations/user/update");
const { validateRateDriver } = require("../validations/user/rating");
const {
  validateChangePassword,
} = require("../validations/user/changePassword");

const { User } = require("../models/user");
const { Driver } = require("../models/driver");
const { Trip } = require("../models/trip");

const register = async (req, res) => {
  const { isValid, errors } = await validateRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password, fullName, userType, phone } = req.body;
  const newUser = new User({
    email,
    password,
    fullName,
    userType,
    phone,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return Promise.reject(err);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return Promise.reject(err);

      newUser.password = hash;

      return newUser
        .save()
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
    });
  });
};

const login = (req, res) => {
  const { isValid, errors } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password, fingerprint } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ email: "Email chưa đăng ký" });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json({ password: "Sai mật khẩu" });

        const payload = {
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          fullName: user.fullName,
          phone: user.phone,
          registerDate: user.registerDate,
          userType: user.userType,
          sex: user.sex,
          address: user.address,
        };

        const KEY = config.secretKey + fingerprint;
        jwt.sign(payload, KEY, { expiresIn: "1h" }, (err, token) => {
          if (err) return res.status(400).json(err);
          return res.status(200).json({ msg: "Sign in successed", token });
        });
      });
    })
    .catch((err) => res.status(400).json(err));
};

const uploadAvatar = (req, res) => {
  const _id = req.params.userId;
  User.findById(_id)
    .then((user) => {
      if (!user) return Promise.reject({ err: "User is not exist" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const updateInfo = async (req, res) => {
  const { isValid, errors } = await validateUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  const _id = req.params.userId;
  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(400).json({ error: "User is not exist" });
      const objRequest = req.body;
      Object.keys(objRequest).forEach((key) => {
        if (objRequest[key] != "") {
          user[key] = objRequest[key];
        }
      });
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const changePassword = (req, res) => {
  const { isValid, errors } = validateChangePassword(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(400).json({ err: "User is not exist" });
      bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({ oldPassword: "Mật khẩu không đúng" });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return Promise.reject(err);
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) return Promise.reject(err);
            user.password = hash;
            return user
              .save()
              .then((user) =>
                res.status(200).json({ msg: "Thay đổi mật khẩu thành công" })
              )
              .catch((err) => res.status(400).json(err));
          });
        });
      });
    })
    .catch((err) => res.status(400).json(err));
};

const rateDriver = (req, res) => {
  const { isValid, errors } = validateRateDriver(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { driverId } = req.params;
  Driver.findById(driverId)
    .then((driver) => {
      if (!driver) return res.status(400).json({ err: "Driver is not exist" });
      const { rating, comment } = req.body;
      driver.passengerRate.push(rating);
      driver.passengerComments.push(comment);
      return driver.save();
    })
    .then((driver) => res.status(200).json(driver))
    .catch((err) => res.status(400).json(err));
};

const getUserById = (req, res) => {
  console.log("vao");
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const getUserByIdParams = (req, res) => {
  const _id = req.params.userId;
  User.findById(_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const removeUser = (req, res) => {
  const _id = req.params.userId;
  User.findOneAndDelete({ _id })
    .then((user) => {
      if (!user) return res.status(400).json({ err: "User does not exist" });
      res.status(200).json({ msg: "Deleted" });
    })
    .catch((err) => res.status(400).json(err));
};

const getAllUser = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

const getUserTrips = (req, res) => {
  const _id = req.params.userId;
  Trip.find()
    .then((trips) => {
      let userTrips = [];
      trips.map((trip) => {
        trip.passengerIds.map((id) => {
          if (id == _id) userTrips.push(trip);
        });
      });
      return res.status(200).json(userTrips);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  register,
  login,
  uploadAvatar,
  updateInfo,
  changePassword,
  rateDriver,
  getUserById,
  getUserByIdParams,
  getAllUser,
  removeUser,
  getUserTrips,
};
