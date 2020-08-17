const express = require("express");

const { authenticating, authorization } = require("../../../middlewares/auth");
const upload = require("../../../config/upload");

const {
  register,
  login,
  uploadAvatar,
  updateInfo,
  changePassword,
  getUserById,
  getUserByIdParams,
  removeUser,
} = require("../../../controllers/user");

const router = express.Router();

// routes: api/user/register

router.post("/register", register);
router.post("/login", login);
router.post("/:userId", authenticating, upload.single("avatar"), uploadAvatar);
router.put("/:userId", authenticating, updateInfo);
router.post("/changePassword", authenticating, changePassword);
router.get("/get", authenticating, getUserById);
router.get("/:userId", authenticating, getUserByIdParams);
router.delete("/:userId", authenticating, authorization(["admin"]), removeUser);

module.exports = router;
