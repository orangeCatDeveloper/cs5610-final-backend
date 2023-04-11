import mongoose from 'mongoose';
const schema = mongoose.Schema(
    {
        username: String,
        password: {
            type: String,
            default: `123`
        },
        firstName: String,
        lastName: String,
        email: String
    }, { collection: 'users' });


const userModel = mongoose
    .model('UserModel', schema);

export default userModel;