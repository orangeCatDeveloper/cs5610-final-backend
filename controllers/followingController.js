import Following from '../models/followingModel.js';

const FollowingController = (app) => {
    app.get("/api/user/:followerid/follow/:followeeid", isFollowing);
    app.get("/api/user/:followerid/follow/", getFollowings);
    app.get("/api/user/follow/:followeeid", getFollowers);
    app.put("/api/user/:followerid/follow/:followeeid", updateFollowing);
}

const isFollowing = async (req, res) => {
    const { followerid, followeeid } = req.params;
    try {
        const isFollowing = await Following.findOne({ follower: followerid, followee: followeeid });
        res.status(200).json(isFollowing ? true : false);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving following" });
    }
}

const getFollowings = async (req, res) => {
    const {followerid} = req.params;
    try {
        const followings = await Following.find({ follower: followerid}).populate("followee");
        res.status(200).json(followings);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving followings" });
    }
}

const getFollowers = async (req, res) => {
    const {followeeid} = req.params;
    try {
        const followers = await Following.find({ followee: followeeid}).populate("follower");
        res.status(200).json(followers);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving followings" });
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