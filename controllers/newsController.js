import axios from 'axios';
import News from '../models/newsModel.js';
import Users from '../models/userModel.js';

const NewsController = (app) => {
    app.get('/api/search', searchNews);
    app.post('/api/save', saveNews);
    app.post('/api/user/:uid/news/:nid', createNewsByUser);
    app.get('/api/news', findAllNews);
    app.get('/api/news/:nid', findNewsById);
    app.delete('/api/news/:nid', deleteNewsById);
    app.delete('/api/news', deleteAllNews);
    app.put('/api/news/:nid', updateNewsById);
}

const searchNews = async (req, res) => {
    const options = {
        url: 'https://newsapi.org/v2/top-headlines',
        params: {
            apiKey: process.env.API_KEY,
            pageSize: 10,
            q: req.query.keyword
        }
    };
    axios.get(options.url, { params: options.params })
        .then(response => {
            const articles = response.data.articles;
            res.json(articles);
        })
        .catch(error => {
            console.log(error);
        });
}

const saveNews = async (req, res) => {
    const { author, title, description, urlToImage: image, publishedAt, url, content } = req.body;
    const existed = await News.findOne({ url });
    if (!existed) {
        const createNews = await News.create({
            author,
            title,
            description,
            image,
            publishedAt: (new Date(publishedAt)).getTime(),
            url,
            content
        })
        res.status(200).json({ _id: createNews._id });
    } else {
        res.status(200).json({ _id: existed._id });
    }
}

const createNewsByUser = async (req, res) => {
    const { title, description, content } = req.body;
    const user = Users.findById(req.params.uid);
    News.create({
        author: user.username,
        title,
        description,
        content
    }).then(myNews => res.json(myNews));
}

const findAllNews = async (req, res) =>
    News.find().then(allNews => res.json(allNews));

const findNewsById = async (req, res) =>
    News.findById(req.params.nid).then(myNews => res.json(myNews));

const deleteNewsById = async (req, res) =>
    News.deleteOne({ _id: req.params.nid }).then(status => res.send(status));

const deleteAllNews = async (req, res) =>
    News.deleteMany({}).then(status => res.send(status));

const updateNewsById = async (req, res) =>
    News.updateOne({ _id: req.params.nid }, { $set: req.body }).then(status => res.send(status));

export default NewsController;