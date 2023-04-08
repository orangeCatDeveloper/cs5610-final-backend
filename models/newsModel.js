import mongoose from 'mongoose';
const schema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: ""
        },
        publishedAt: {
            type: String,
            default: Date.now
        },
        url: {
            type: String,
            default: "https://www.northeastern.edu/graduate/wp-content/uploads/2016/08/IMG_9623-1.jpg"
        },
        content: {
            type: String,
            required: true,
        },
    }, { collection: 'news' });


const newsModel = mongoose
    .model('NewsModel', schema);

export default newsModel;