import jwt from 'jsonwebtoken';

const createToken = ({ id, username, role }) =>
    jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET, {
        expiresIn: '2h'
    })

export default createToken;