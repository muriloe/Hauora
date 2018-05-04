var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var grupoSchema = new Schema({
    titulo: {type: String}
});

var Grupo = mongoose.model('Grupos', grupoSchema);
module.exports = Grupo;