import Reviews from '../models/reviewModel.js';
import { verifyToken } from '../middlewares/auth.js';
const ReviewController = (app) => {
    app.post("/api/user/:uid/review/:nid", verifyToken, createReview);
    app.get("/api/user/:uid/review", getMyReviews);
    app.get("/api/news/:nid/review", getReviewsForNews);
    app.delete("/api/user/:uid/review/:nid", deleteReview);
}

const createReview = async (req, res) => {
    const { uid, nid } = req.params;
    const { content } = req.body;
    try {
        const newReview = await Reviews.create({ newsID: nid, postedBy: uid, content });
        res.status(201).json(newReview);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating review" });
    }
}

const deleteReview = async (req, res) => {
    const { uid, nid } = req.params;
    try {
        const deleteStatus = await Reviews.deleteOne({ newsID: nid, postedBy: uid });
        res.status(200).json(deleteStatus ? true : false);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting review" });
    }
}

const getMyReviews = async (req, res) => {
    const { uid } = req.params;
    try {
        const myReviews = await Reviews.find({ postedBy: uid }).populate('newsID');
        res.status(200).json(myReviews);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving reviews" });
    }
}

const getReviewsForNews = async (req, res) => {
    const { nid } = req.params;
    try {
        const allReviews = await Reviews.find({ newsID: nid }).populate('postedBy');
        res.status(200).json(allReviews);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving reviews" });
    }
}

export default ReviewController;