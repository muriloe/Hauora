var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var remedioSchema = new Schema({
    nome: String,
    descricao: String,
    anamnese: {type: ObjectId, ref: 'Anamneses', required: true}
});

var Remedio = mongoose.model('Remedios', remedioSchema);
module.exports = Remedio;