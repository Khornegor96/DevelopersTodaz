const express = require("express");
const {
  getAvailableCountries,
  getCountryInfo,
  getCountryPopulation,
  getCountryFlags,
} = require("../controllers/country.controller");
const router = express.Router();

router.get("/available", getAvailableCountries);
router.get("/:countryCode", getCountryInfo);
router.get("/countryFlags", getCountryFlags)
router.get("/countryPopulation", getCountryPopulation)


module.exports = router;
