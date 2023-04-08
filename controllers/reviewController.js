import Review from '../models/reviewModel';

const ReviewController = (app) => {
    app.post("api/user/:uid/review/:nid", createReview);
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


export default ReviewController;