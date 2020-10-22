const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const server = express();

const config = require('./config');
const uri = config.database.uri;
const port = config.server.port;

/*
  Connexion à la base de données.
 */
mongoose.connect(uri, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
});

mongoose.connection.on("error", function (err) {
  console.log('Problème de connexion à : ' + uri + '. ' + err);
});

mongoose.connection.on("connected", function () {
  console.log('Connecté à : ' + uri);
});

/*
 *  Configuration du serveur.
 */
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(bodyParser.json());
server.use(express.static('dist'));
server.use(cors());
server.use(cookieParser());

server.get('/authentication', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

require('./routes/access')(server);
require('./routes/authorization')(server);
require('./routes/user')(server);

/*
  Démarrage du serveur.
 */
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}.`);
});
