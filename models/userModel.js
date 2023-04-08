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
        email: String,
        avatar: {
            type: String,
            default:
                "https://firebaspot.com/o/images%2Fdefault-avatar.jpeg?alt=media&token=4c5d0224-e530-4d60-b03a-f56251460ee2"
        }
    }, { collection: 'users' });


const usersModel = mongoose
    .model('UserModel', schema);

export default userModel;