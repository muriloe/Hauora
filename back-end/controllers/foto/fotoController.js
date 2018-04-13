var path =          require('path');
const sharp =       require('sharp');
var fs =            require("fs");
let ServerInfo =    require("../../config/server");

module.exports = function(app){

    app.get('/uploads/:fotoId', function(req, res){
        res.sendFile(path.resolve('./uploads/'+req.params.fotoId),  function(err) {
            if(err){console.log("Erro ao obter foto");}     
        });
   });

   app.get('/uploads/min/:fotoId', function(req, res){
        console.log("entro min");
        sharp('./uploads/'+req.params.fotoId).resize(100, 100).max().toBuffer(function(err, buffer) {
            if (err) {console.log("erro ao obter foto min");}
            var fileName= './uploads/min/'+req.params.fotoId;
            fs.writeFileSync(fileName, buffer);
            res.sendfile(path.resolve('./uploads/min/'+req.params.fotoId),  function(err) {
                if (err){console.log("erro image mins");}
            });
        });
    });

}