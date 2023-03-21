import express from "express";
import { getCountries } from "../controllers/Places.js";

const places_router = express.Router();

places_router
.get('/countries', getCountries)

export default places_router;