import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accesstoken || req.headers['x-access-token'];

    if (!token) return res.status(401).json({msg: 'No token found'});

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) res.status(403).json({msg: 'Not autorized'});
            next();
        }
    );
};