import mongoose, { Schema } from 'mongoose';
const schema = mongoose.Schema(
    {
        followee: { type: Schema.Types.ObjectId, ref: "UserModel" },
        follower: { type: Schema.Types.ObjectId, ref: "UserModel" },

    }, { timestamps: true, collection: 'following' });


const followingModel = mongoose
    .model('followingModel', schema);

export default followingModel;