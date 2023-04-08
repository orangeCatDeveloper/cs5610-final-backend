import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
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

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(401)
        throw new Error('User is not an admin')
    }
}

export const isCreator = (req, res, next) => {
    if (req.user && req.user.role === "creator") {
        next()
    } else {
        res.status(401)
        throw new Error('User is not an admin')
    }
}