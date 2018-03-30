var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var anamneseSchema = new Schema({
    data: {type: Date, default:Date.now()},
    cliente: {type: ObjectId, ref: 'Clientes', required: true}
});

var Anamnese = mongoose.model('Anamneses', anamneseSchema);
module.exports = Anamnese;