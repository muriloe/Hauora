var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome: String,
    email: String,
    telefone: String,
    sexo: Boolean,
    data_nascimento: Date

});

var Pessoas = mongoose.model('Pessoas', pessoaSchema);

module.exports = Pessoas;