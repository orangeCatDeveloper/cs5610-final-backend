import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Please login");
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;