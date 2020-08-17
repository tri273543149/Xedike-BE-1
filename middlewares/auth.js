const jwt = require("jsonwebtoken");

const authenticating = (req, res, next) => {
  const token = req.header("Authorization");
  const fingerprint = req.header("fingerprint");
  const KEY = "Cybersoft" + fingerprint;
  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "You have to login" });
  }
};

const authorization = (userTypeArray) => {
  return (req, res, next) => {
    const { userType } = req.user;
    if (userTypeArray.indexOf(userType) > -1) {
      return next();
    } else {
      res.status(403).json({ error: "You are not allowed to do this" });
    }
  };
};



module.exports = { authenticating, authorization };
