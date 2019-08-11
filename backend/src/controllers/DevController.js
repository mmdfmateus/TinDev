const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async listAll(req, res){
        const { userId } = req.params;

        const user = await Dev.findById(userId);

        const usersList = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: user.likes } },
                { _id: { $nin: user.dislikes } }
            ]
        });

        return res.json(usersList);
    },
    async store(req, res) {
        const { username } = req.body;
        const userExists = await Dev.findOne({user: username});
        
        if(userExists){
            return res.json(userExists);
        } 

        var response = await axios.get(`https://api.github.com/users/${username}`);
        
        const { name, bio, avatar_url: avatar} = response.data;

        var dev = await Dev.create({
            user: username,
            name,
            bio,
            avatar
        });

        return res.json(dev);
    }
};