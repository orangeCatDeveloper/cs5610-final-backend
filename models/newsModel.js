import mongoose from 'mongoose';
const schema = mongoose.Schema(
    {
        author: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "https://www.northeastern.edu/graduate/wp-content/uploads/2016/08/IMG_9623-1.jpg"
        },
        publishedAt: {
            type: String,
            default: Date.now
        },
        url: {
            type: String,
            default: ""
        },
        content: {
            type: String,
        },
    }, { collection: 'news' });


const newsModel = mongoose
    .model('NewsModel', schema);

export default newsModel;