const express = require('express');
const devController = require('./controllers/DevController');
const likeController = require('./controllers/LikeController');
const dislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/dev/:userId', devController.listAll);
routes.post('/dev', devController.store);

routes.post('/like', likeController.store);
routes.post('/dislike', dislikeController.store);

module.exports = routes;