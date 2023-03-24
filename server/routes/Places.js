import express from "express";
import { 
    getPlaces,
    getPlacesNames, 
    addPlace 
} from "../controllers/Places.js";

const places_router = express.Router();

places_router
.get('/', getPlaces)
.get('/names', getPlacesNames)
.post('/add_place', addPlace)

export default places_router;