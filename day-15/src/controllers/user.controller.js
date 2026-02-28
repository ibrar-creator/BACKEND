const followModel = require("../models/follow.model");

// ...existing code...

// ...existing code...

async function followUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        if (!followerUsername || !followeeUsername || typeof followeeUsername !== 'string') {
            return res.status(400).json({ message: "Invalid input" });
        }

        if (followeeUsername === followerUsername) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        let followRecord = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
        });

        if (followRecord && followRecord.status === "accepted") {
            return res.status(409).json({
                message: `You are already following ${followeeUsername}`,
                follow: followRecord
            });
        }

        // If record exists but not accepted, update to accepted; else create new with accepted
        if (followRecord) {
            followRecord.status = "accepted";
            await followRecord.save();
        } else {
            followRecord = await followModel.create({
                follower: followerUsername,
                followee: followeeUsername,
                status: "accepted"  // Override default to make it direct
            });
        }

        res.status(201).json({
            message: `You are now following ${followeeUsername}`,
            follow: followRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// ...existing code...
// ...existing code...
async function unfollowUserController(req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username;

        if (!followerUsername || !followeeUsername || typeof followeeUsername !== 'string') {
            return res.status(400).json({ message: "Invalid input" });
        }

        const isUserFollowing = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
        });

        if (!isUserFollowing) {
            return res.status(404).json({
                message: `You are not following ${followeeUsername}`
            });
        }

        await followModel.findByIdAndDelete(isUserFollowing._id);

        res.status(200).json({
            message: `You have unfollowed ${followeeUsername}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// ...existing code...

async function acceptFollowController(req, res) {
    try {
        const followeeUsername = req.user.username; // Assuming followee is the logged-in user
        const followerUsername = req.params.username; // Follower requesting acceptance

        if (!followeeUsername || !followerUsername || typeof followerUsername !== 'string') {
            return res.status(400).json({ message: "Invalid input" });
        }

        const followRecord = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        if (!followRecord) {
            return res.status(404).json({ message: "No pending follow request found" });
        }

        followRecord.status = "accepted";
        await followRecord.save();

        res.status(200).json({
            message: `Follow request from ${followerUsername} accepted`,
            follow: followRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function rejectFollowController(req, res) {
    try {
        const followeeUsername = req.user.username; // Assuming followee is the logged-in user
        const followerUsername = req.params.username; // Follower requesting rejection

        if (!followeeUsername || !followerUsername || typeof followerUsername !== 'string') {
            return res.status(400).json({ message: "Invalid input" });
        }

        const followRecord = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        });

        if (!followRecord) {
            return res.status(404).json({ message: "No pending follow request found" });
        }

        followRecord.status = "rejected";
        await followRecord.save();

        res.status(200).json({
            message: `Follow request from ${followerUsername} rejected`,
            follow: followRecord
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// ...existing code...

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowController,
    rejectFollowController
};
