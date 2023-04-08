import Review from '../models/reviewModel';

const ReviewController = (app) => {
    app.post("api/user/:uid/review/:nid", createReview);
    app.get("api/user/:uid/review", getMyReviews);
}

const createReview = async (req, res) => {
    const { uid, nid } = req.params;
    const { content } = req.body;
    try {
        const review = await Review.create({ newsID: nid, postedBy: uid, content });
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: "Error creating review" });
    }
}

const getMyReviews = async (req, res) => {
    const { uid } = req.params;
    try {
        const reviews = await Review.find({ postedBy: uid }).populate('newsID');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving reviews" });
    }
}

export default ReviewController;