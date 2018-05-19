var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var exercicioSchema = new Schema({
    texto: {type: String},
    data: {type: Date, default:Date.now()},
});

var Exercicio = mongoose.model('Exercicios', exercicioSchema);
module.exports = Exercicio;