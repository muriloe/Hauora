var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var doencaSchema = new Schema({
    texto:       {type: String},
    cliente:     {type: ObjectId, ref: 'Cliente', required: true},
    data:        {type: Date, default: Date.now}
});

var Notificacao = mongoose.model('Notificacoes', doencaSchema);
module.exports = Notificacao;