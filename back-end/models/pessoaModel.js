var mongoose = require('mongoose');
extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome:               { type: String},
    email:              { type: String, unique: true, required: true },
    senha:              { type: String},
    telefone:           { type: String},
    sexo:               { type: String},
    data_nascimento:    { type: Date},
    foto:               { type: String}

});

var Pessoas = mongoose.model('Pessoas', pessoaSchema);
module.exports = Pessoas;