import Users from "../models/userModel";
import createToken from '../utils/tokenManager.js';
import verifyToken from '../middlewares/auth.js';


const UserController = (app) => {
    app.post("api/register", register);
    app.post("api/login", login);
    app.get('/api/users/:uid', findUserById);
    app.put('/api/users/:uid', verifyToken, updateUser);
    app.get('/api/users', findAllUsers);
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
        encryptedPassword = await bcrypt.hash(password, 11);
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword,
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send("Server error");
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    password = await bcrypt.hash(password, 11);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            name: user.name,
            email: user.email,
            token: createToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid username or password')
    }
}

const findAllUsers = async (req, res) =>
    Users.find().then(allUsers => res.json(allUsers));

const updateUser = async (req, res) =>
    Users.updateOne({ _id: req.params.uid }, { $set: req.body }).then(user => res.json(user));

const findUserById = async (req, res) =>
    Users.findById(req.params.uid).then(user => res.json(user));


export default UserController;