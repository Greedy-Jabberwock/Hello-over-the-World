import express from "express";
import { getPlaces, addPlace } from "../controllers/Places.js";

const places_router = express.Router();

places_router
.get('/', getPlaces)
.post('/add_place', addPlace)

export default places_router;