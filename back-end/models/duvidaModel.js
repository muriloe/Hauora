var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var duvidaSchema = new Schema({
    texto: {type: String},
    data: {type: Date, default:Date.now()},
});

var Duvida = mongoose.model('Duvidas', duvidaSchema);
module.exports = Duvida;