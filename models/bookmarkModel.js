import mongoose, { Schema } from 'mongoose';
const schema = mongoose.Schema(
    {
        newsID: { type: Schema.Types.ObjectId, ref: "NewsModel" },
        postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
        is_bookmarked: {
            type: Boolean,
            default: false,
        },
    }, { collection: 'bookmark' });


const bookmarkModel = mongoose
    .model('CommentModel', schema);

export default bookmarkModel;