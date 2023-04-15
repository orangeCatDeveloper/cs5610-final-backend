import Following from '../models/followingModel.js';

const FollowingController = (app) => {
    app.get("/api/user/:followerid/follow/:followeeid", getFollowing);
    app.put("/api/user/:followerid/follow/:followeeid", updateFollowing);
}

const getFollowing = async (req, res) => {
    const { followerid, followeeid } = req.params;
    try {
        const isFollowing = await Following.findOne({ follower: followerid, followee: followeeid });
        res.status(200).json(isFollowing ? true : false);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving following" });
    }
}

const updateFollowing = async (req, res) => {
    const { followerid, followeeid } = req.params;
    console.log(followerid);
    console.log(followeeid);
    try {
        const isFollowing = await Following.findOne({ follower: followerid, followee: followeeid });
        if (isFollowing) {
            await Following.deleteOne({ follower: followerid, followee: followeeid });
        } else {
            await Following.create({ follower: followerid, followee: followeeid });
        }
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json({ message: "Error updating following" });
    }
}

export default FollowingController;