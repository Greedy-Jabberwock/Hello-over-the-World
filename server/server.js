import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from './routes/Users.js';

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

app.use(router);
