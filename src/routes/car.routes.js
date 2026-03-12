const express = require("express");
const { getAllCars, getCarsByCategory } = require("../controllers/carController");

const router = express.Router();

router.get("/", getAllCars);
router.get("/filter", getCarsByCategory);

module.exports = router;