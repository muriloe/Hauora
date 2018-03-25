var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var clientSchema = new Schema({
    objetivo: String,
    //TODO: acesso: tyneint. Verificar o que é esse acesso
    pessoa: {type: ObjectId, ref: 'Pessoas'}
});

var Cliente = mongoose.model('Clientes', clientSchema);
module.exports = Cliente;