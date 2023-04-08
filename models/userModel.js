import mongoose from 'mongoose';
const schema = mongoose.Schema(
    {
        username: String,
        password: {
            type: String,
            required: true,
            default: `testpassword${Date.now()}`
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: String
    }, { collection: 'users' });


const usersModel = mongoose
    .model('UserModel', schema);

export default userModel;