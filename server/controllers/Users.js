import User from '../model/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";


export const getUsers = async (req, res) => {
    try {
        console.log('Search users');
        const users = await User.findAll();
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(404).json({msg: error});
    }
}

export const register = async(req, res) => {
    console.log('Register route...');
    console.log('-- Request body: ', req.body);
    const {username, email, password} = req.body;
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);
    console.log('-- Hashed password: ', hashed_password);
    try {
        console.log('Creating usser record...');
        await User.create(
            {   
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashed_password
            }
        );
        console.log('Success');
        res.status(200).json({msg: "Register Successful"});
    } catch (error) {
        console.log('Failure');
        res.status(404).json({msg: error});
    }
}

export const login = async (req, res) => {
    try {
        console.log('Searching');
        const user = await User.findOne(
            {
                where: {
                    [Op.or]: [
                        {username: req.body.value.toLowerCase()},
                        {email: req.body.value.toLowerCase()}
                    ]
                }
            }
        );
        console.log(user);
        console.log('Matching password');
        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        if (!match) {
            return res
                    .status(400)
                    .json({msg: 'Wrong password'});
        }
        console.log('Get user');
        const { userid, email, username } = user;
        console.log('Sign token');
        const token = jwt.sign(
            {
                userid,
                username,
                email
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '30m'
            }
        );
        console.log('Create cookie');
        res.cookie(
            'accesstoken', 
            token,
            {
                httpOnly: true,
                maxAge: 30 * 60 * 1000
            }
        );
        console.log('Send responce');
        res.json({token});

    } catch (error) {
        console.log('ERROR:', error.message);
        res
        .status(404)
        .json({msg: "Email or username not found"});
    }
}