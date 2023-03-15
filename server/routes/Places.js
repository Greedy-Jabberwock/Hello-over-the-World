import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getCountries, getCities, getCitiesInCountry } from "../controllers/Places.js";

const places_router = express.Router();

places_router
.get('/countries', getCountries)
.get('/countryCities', getCitiesInCountry)
.get('/cities', getCities);

export default places_router;