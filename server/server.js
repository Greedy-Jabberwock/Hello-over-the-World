import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./config/db.js";

import users_router from './routes/Users.js';
import places_router from "./routes/Places.js";
import populate_router from "./routes/Populating.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT || 8080, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.use('/users', users_router);
app.use('/places', places_router);
app.use('/populate', populate_router);


try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.log(error);
}