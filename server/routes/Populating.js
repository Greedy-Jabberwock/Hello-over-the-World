import express from "express";
import { populateCountries, populateCities } from "../controllers/Populating.js";

const populate_router = express.Router();

populate_router
.put('/countries', populateCountries)
.put('/cities', populateCities)

export default populate_router;