var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var clientSchema = new Schema({
    objetivo: String,
    //Caso false o cliente está no modo de anamnese
    acessoCompleto: {type: Boolean, default: false}, 
    pessoa: {type: ObjectId, ref: 'Pessoas'}
});

var Cliente = mongoose.model('Clientes', clientSchema);
module.exports = Cliente;