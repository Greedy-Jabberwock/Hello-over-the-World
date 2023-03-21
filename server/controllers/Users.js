import Users from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";


export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll(
            {attributes: ['userid', 'username', 'email', 'password']});
        res.json(users);
    } catch (error) {
        res.status(404).json({msg: error});
    }
}

export const register = async(req, res) => {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);

    try {
        await Users.create(
            {   
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashed_password
            },
            {
                fields: ['user_id', 'username', 'email', 'password'],
                returning: ['username', 'email', 'password']
            }
        );
        res.status(200).json({msg: "Register Successful"});
    } catch (error) {
        res.status(404).json({msg: error});
    }
}

export const login = async (req, res) => {
    try {
        // console.log('Searching');
        const users = await Users.findAll(
            {
                where: {
                    [Op.or]: [
                        {username: req.body.value.toLowerCase()},
                        {email: req.body.value.toLowerCase()}
                    ]
                },
                attributes: ['username', 'email', 'password']
            }
        );
        // console.log('Matching password');
        const match = await bcrypt.compare(
            req.body.password,
            users[0].password
        );
        
        if (!match) {
            return res
                    .status(400)
                    .json({msg: 'Wrong password'});
        }
        // console.log('Get user');
        const { userid, email, username } = users[0];
        // console.log('Sign token');
        const token = jwt.sign(
            {
                userid,
                username,
                email
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '180s'
            }
        );
        // console.log('Create cookie');
        res.cookie(
            'accesstoken', 
            token,
            {
                httpOnly: true,
                maxAge: 180 * 1000
            }
        );
        // console.log('Send responce');
        res.json({token});

    } catch (error) {
        // console.log('ERROR:', error.message);
        res
        .status(404)
        .json({msg: "Email or username not found"});
    }
}