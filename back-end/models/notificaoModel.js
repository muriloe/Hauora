var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var doencaSchema = new Schema({
    texto:       {type: String},
    cliente:     {type: ObjectId, ref: 'Cliente', required: true}
});

var Notificacao = mongoose.model('Notificacoes', doencaSchema);
module.exports = Notificacao;