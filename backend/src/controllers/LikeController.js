const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const {
            user: userId,
            devLiked: devLikedId
        } = req.body;
        var match = false;

        const user = await Dev.findById(userId);
        const devLiked = await Dev.findById(devLikedId);

        if (!user || !devLiked) {
            return res.status(400).json({
                error: "Couldn't find user or devLiked"
            });
        }

        if (devLiked.likes.includes(user._id)) {
            match = true;
        }

        user.likes.push(devLiked._id);
        await user.save();

        return res.json({
            match: match,
            user: user
        });
    }
};