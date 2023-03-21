import express from "express";
import { populateCountries } from "../controllers/Populating.js";

const populate_router = express.Router();

populate_router
.put('/countries', populateCountries)

export default populate_router;