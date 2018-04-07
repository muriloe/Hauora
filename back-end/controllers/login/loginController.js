var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: true
      }));

    app.use(bodyParser.json());

    
}