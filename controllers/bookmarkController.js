import Bookmark from '../models/bookmarkModel.js';

const BookmarkController = (app) => {
    app.get("/api/user/:uid/bookmark/:nid", getBookmark);
    app.get("/api/user/:uid/bookmark", getMyBookmark);
    app.put("/api/user/:uid/bookmark/:nid", updateBookmark);
}

const getBookmark = async (req, res) => {
    const { uid, nid } = req.params;
    try {
        const bookmark = await Bookmark.findOne({ postedBy: uid, newsID: nid });
        res.status(200).json(bookmark ? true : false);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving bookmark" });
    }
}

const updateBookmark = async (req, res) => {
    const { uid, nid } = req.params;
    try {
        const bookmark = await Bookmark.findOne({ postedBy: uid, newsID: nid });
        if (bookmark) {
            await Bookmark.deleteOne({ postedBy: uid, newsID: nid });
        } else {
            await Bookmark.create({ postedBy: uid, newsID: nid });
        }
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json({ message: "Error registering bookmark" });
    }
}

const getMyBookmark = async (req, res) => {
    const {uid} = req.params;
    try {
        const myBookmark = await Bookmark.find({ postedBy: uid}).populate('newsID');
        res.status(200).json(myBookmark);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving bookmark" });
    }
}

export default BookmarkController;