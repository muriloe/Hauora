var mongoose = require('mongoose');
extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome:               { type: String, required: true},
    email:              { type: String, unique: true, required: true },
    senha:              { type: String, required: true },
    telefone:           { type: String},
    sexo:               { type: String, required: true},
    data_nascimento:    { type: Date, required: true},
    foto:               { type: String}

});

var Pessoas = mongoose.model('Pessoas', pessoaSchema);
module.exports = Pessoas;