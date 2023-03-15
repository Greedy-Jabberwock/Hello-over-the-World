import express from "express";
import { getCountries, populateCountries, populateCities } from "../controllers/Countries.js";

const countries_router = express.Router();

countries_router
.get('/all', getCountries)
.put('/populate_countries', populateCountries)
.put('/populate_cities', populateCities);

export default countries_router;