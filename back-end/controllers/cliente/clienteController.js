var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Cliente =  require('../../models/clienteModel');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {
    app.get('/api/clientes/anamnese', function(req, res){
        console.log("asdasd1");
        Cliente.find({ acesso: false }, function (err, clientes) {
            console.log(clientes);
            if (err){
                return res.status(500).json({
                    title: 'Ocorreu um erro',
                    error: err
                })
            }
            else{
                res.status(200).json({
                    message: 'Success',
                    obj: clientes
                });

            }
            
        });
    });

}