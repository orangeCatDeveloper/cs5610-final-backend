import mongoose from 'mongoose';
const schema = mongoose.Schema(
    {
        newsID: { type: Schema.Types.ObjectId, ref: "NewsModel" },
        postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
        content: {
            type: String,
            required: true,
        },
    }, { timestamps: true, collection: 'review' });


const reviewModel = mongoose
    .model('ViewModel', schema);

export default reviewModel;