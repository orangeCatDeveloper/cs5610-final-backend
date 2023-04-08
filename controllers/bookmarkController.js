import Bookmark from '../models/bookmarkModel';

const BookmarkController = (app) => {
    app.post("api/user/:uid/bookmark/:nid", register);
    app.get("api/user/:uid/bookmark/:nid", getBookmark);
}



const getBookmark = async (req, res) => {

}

const register = async (req, res) => {

}

export default BookmarkController;