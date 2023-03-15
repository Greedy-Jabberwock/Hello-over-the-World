import express from "express";
import { getCountries, getCities } from "../controllers/Places.js";

const places_router = express.Router();

places_router
.get('/countries', getCountries)
.get('/cities', getCities);

export default places_router;