var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var consumoSchema = new Schema({
    //TODO: adicionar tipo
    texto:          {type: String},
    data:           {type: Date, default:Date.now()},
    sentimento:     {type: String},
    observacao:     {type: String},
    anamnese:       {type: ObjectId, ref: 'Anamneses'} 
});

var Consumo = mongoose.model('Consumos', consumoSchema);
module.exports = Consumo;