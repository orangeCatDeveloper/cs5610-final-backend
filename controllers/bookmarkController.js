import Bookmark from '../models/bookmarkModel.js';

const BookmarkController = (app) => {
    app.put("api/user/:uid/bookmark/:nid", updateBookmark);
    app.get("api/user/:uid/bookmark/:nid", getBookmark);
}

const getBookmark = async (req, res) => {
    const { uid, nid } = req.params;
    try {
        const bookmark = await Bookmark.findOne({ uid, nid });
        res.status(200).json(bookmark ? true : false);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving bookmark" });
    }
}

const updateBookmark = async (req, res) => {
    const { uid, nid } = req.params;
    try {
        const bookmark = await Bookmark.findOne({ uid, nid });
        if (bookmark) {
            await Bookmark.deleteOne({ uid, nid });
        } else {
            await Bookmark.create({ uid, nid });
        }
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json({ message: "Error registering bookmark" });
    }
}

export default BookmarkController;