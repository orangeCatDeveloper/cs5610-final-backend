import mongoose, { Schema } from 'mongoose';
const schema = mongoose.Schema(
    {
        newsID: { type: Schema.Types.ObjectId, ref: "NewsModel" },
        postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    }, { collection: 'bookmark' });


const bookmarkModel = mongoose
    .model('bookmarkModel', schema);

export default bookmarkModel;