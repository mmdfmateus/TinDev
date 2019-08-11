const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const {
            user: userId,
            devDisliked: devDislikedId
        } = req.body;

        const user = await Dev.findById(userId);
        const devDisliked = await Dev.findById(devDislikedId);

        if (!user || !devDisliked) {
            return res.status(400).json({
                error: "Couldn't find user or dev disliked"
            });
        }

        user.dislikes.push(devDisliked._id);
        await user.save();

        return res.json(user);
    }
};