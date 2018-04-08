var path = require('path');

module.exports = function(app){

    app.get('/uploads/:fotoId', function(req, res){

        res.sendfile(path.resolve('./uploads/'+req.params.fotoId),  function(err) {
            reject({"status":false, "message":"Não consegui obter a foto :(", "error": err});
        });
   });
}