var mongoose =  require('mongoose');
extend =        require('mongoose-schema-extend'),
Schema =        mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;
PessoaSchema = require('./pessoaModel');

var nutricionistaSchema = PessoaSchema.discriminator('Nutricionista', new Schema({
    consulta:      [{type: ObjectId, ref: 'Nutricionista'}]
}));

var Nutricionista = mongoose.model('Nutricionista');
module.exports = Nutricionista;