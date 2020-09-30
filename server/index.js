const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const options = {
  origin: function(origin, callback) {
    // A faire
    callback(null, ['https://mp-mp3.herokuapp.com']);
  },
  credentials: true
}

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
});

mongoose.connection.on("error", function(err) {
  console.log('Problème de connexion à : ' + uri + '. ' + err);
});

mongoose.connection.on("connected", function(err, res) {
  console.log('Connecté à : ' + uri);
});

const server = express();
const port = process.env.PORT || 8000;

server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(bodyParser.json());
server.use(express.static('dist'));
server.use(cors(options));
server.use(cookieParser());

server.get('/authenticate', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

require('./access')(server);
require('./authorize')(server);
require('./secure')(server);

server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}.`);
});
