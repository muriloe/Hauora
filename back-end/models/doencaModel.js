var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var doencaSchema = new Schema({
    nome:       {type: String},
    descricao:  {type: String},
    anamnese:   {type: ObjectId, ref: 'Anamneses', required: true}
});

var Doenca = mongoose.model('Doencas', doencaSchema);
module.exports = Doenca;