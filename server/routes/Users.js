import express from "express";
import { getUsers, register, login } from "../controllers/Users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const users_router = express.Router();

users_router
.get('/', verifyToken, getUsers)
.post('/register', register)
.post('/login', login)

export default users_router;