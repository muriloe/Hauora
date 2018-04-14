var mongoose =  require('mongoose');
extend =        require('mongoose-schema-extend'),
Schema =        mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;
PessoaSchema = require('./pessoaModel');

var nutricionistaSchema = PessoaSchema.discriminator('Nutricionista', new Schema({
    consulta:      [{type: ObjectId, ref: 'Nutricionistas'}]
}));

var Nutricionista = mongoose.model('Nutricionistas');
module.exports = Nutricionista;