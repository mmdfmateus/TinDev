const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes");

mongoose.connect('mongodb+srv://admin:admin@cluster0-kpsw6.mongodb.net/tindev?retryWrites=true&w=majority', {useNewUrlParser: true})

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(5000);