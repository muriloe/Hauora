var mongoose = require('mongoose');
extend = require('mongoose-schema-extend'),
Schema = mongoose.Schema;
PessoaSchema = require('./pessoaModel');

var clientSchema = PessoaSchema.discriminator('Clientes', new Schema({
    objetivo:       { type : String },
    acesso:         {type: Boolean, default: false}, //Caso false o cliente está no modo de anamnese
}));

var Cliente = mongoose.model('Clientes');
module.exports = Cliente;