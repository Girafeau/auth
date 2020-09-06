const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

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

server.use(parser.urlencoded({
  extended: false
}));
server.use(parser.json());
server.use(express.static('dist'));
const options = {
  origin: function(origin, callback) {
    // Appel à la base de données
    callback(error, ['http://localhost:8080', 'http://localhost:8080']);
  },
  credentials: true
}
server.use(cors(options));

server.get('/authenticate', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


require('./access')(server);
require('./authorize')(server);
require('./secure')(server);


server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}.`);
});
