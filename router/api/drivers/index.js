const express = require("express");
const { getAllDriver } = require("../../../controllers/driver");
const router = express.Router();

// ROUTES: /api/users

router.get("/", getAllDriver);

module.exports = router;
