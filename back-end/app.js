var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
var anamneseController = require('./controllers/anamnese/anamneseController');
var port = process.env.port || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
mongoose.connect(config.getDbConnectionString());

//Inicia as API's
setupController(app);
apiController(app);
anamneseController(app);
//Fim: Inicia as API's

app.listen(port);

