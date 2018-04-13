var express =                       require('express');
var app =                           express();
var mongoose =                      require('mongoose');
var config =                        require('./config');
var setupController =               require('./controllers/setupController');
var apiController =                 require('./controllers/apiController');
var anamneseController =            require('./controllers/anamnese/anamneseController');
var fotoController =                require('./controllers/foto/fotoController');
var clienteController =             require('./controllers/cliente/clienteController');
var loginController =               require('./controllers/login/loginController');
var bodyParser =                    require('body-parser');
var port = process.env.port || 3000;


app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
mongoose.connect(config.getDbConnectionString());

//Inicia as API's
clienteController(app);
setupController(app);
apiController(app);
anamneseController(app);
fotoController(app);
loginController(app);

//Fim: Inicia as API's

app.listen(port);

