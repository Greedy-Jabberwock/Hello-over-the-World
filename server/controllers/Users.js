import User from '../model/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";


export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}

export const getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByPk(
            userId,
            {
                attributes: ['username', 'email', 'createdAt']
            }
        );
        res.json(user);
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(password, salt);
        await User.create(
            {
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashed_password
            }
        );
        res.status(200).json({ msg: "Register Successful, you can log in now!" });
    } catch (error) {
        res.status(404).json({ msg: 'This username or email already exists, try another.' });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                where: {
                    [Op.or]: [
                        { username: req.body.value.toLowerCase() },
                        { email: req.body.value.toLowerCase() }
                    ]
                }
            }
        );
        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!match) {
            return res
                .status(400)
                .json({ msg: 'Wrong password' });
        }
        const { id, email, username, createdAt } = user;
        const token = jwt.sign(
            {
                id,
                username,
                email,
                createdAt
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '30m'
            }
        );
        res.cookie(
            'accesstoken',
            token,
            {
                httpOnly: true,
                maxAge: 30 * 60 * 1000
            }
        );
        res.json({ token });

    } catch (error) {
        res
            .status(404)
            .json({ msg: "Email or username not found" });
    }
}