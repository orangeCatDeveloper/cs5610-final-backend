import Users from "../models/userModel.js";
import createToken from '../utils/tokenManager.js';
import { verifyToken } from '../middlewares/auth.js';


const UserController = (app) => {
    app.post("/api/register", register);
    app.post("/api/login", login);
    app.get('/api/users/:uid', findUserById);
    app.put('/api/users/:uid', verifyToken, updateUser);
    app.get('/api/users', findAllUsers);
    app.delete('/api/users/:uid', deleteUserById);
    app.delete('/api/users', deleteAllUsers);
}

const register = async (req, res) => {
    try {
        const { username, firstName, lastName, password, email } = req.body;
        if (!(username && password && firstName && lastName && email)) {
            res.status(400).send("Missing information");
        }
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(409).send("User Already Exist");
        }
        const user = await Users.create({
            username,
            password,
            firstName,
            lastName,
            email,
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}

const login = async (req, res) => {
    const { username, password, role } = req.body
    console.log(username)
    const user = await Users.findOne({ username, password });
    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            token: createToken(user._id, user.username, role),
        })
    } else {
        res.status(401).json('Invalid username or password');
    }
}

const findAllUsers = async (req, res) =>
    Users.find().then(allUsers => res.json(allUsers));

const updateUser = async (req, res) =>
    Users.updateOne({ _id: req.params.uid }, { $set: req.body }).then(user => res.json(user));

const findUserById = async (req, res) =>
    Users.findById(req.params.uid).then(user => res.json(user));

const deleteUserById = async (req, res) =>
    Users.deleteOne({ _id: req.params.uid }).then(status => res.send(status));

const deleteAllUsers = async (req, res) =>
    Users.deleteMany({}).then(status => res.send(status));

export default UserController;