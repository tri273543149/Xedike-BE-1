const express = require("express");
const { getAllUser } = require("../../../controllers/user");
const router = express.Router();

// ROUTES: /api/users

router.get("/", getAllUser);

module.exports = router;
