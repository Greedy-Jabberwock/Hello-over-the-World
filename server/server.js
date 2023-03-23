import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./config/db.js";

import users_router from './routes/Users.js';
import places_router from "./routes/Places.js";
import articles_router from "./routes/Articles.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT || 8080, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

app.use('/api/users', users_router);
app.use('/api/places', places_router);
app.use('/api/articles', articles_router);

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.log(error);
}