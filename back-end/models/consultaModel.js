var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;
var ObjectId =  Schema.Types.ObjectId;

var consultaSchema = new Schema({
    data:               {type: Date, default:Date.now()},
    peso:               {type: String},
    pesoIdeal:          {type: String},
    percentualGordura:  {type: String},
    imc:                {type: String},
    deficiencias:       {type: String},
    excessos:           {type: String},
    linkExames:         [{type: String}],
    observacoes:        {type: String},
    linkRelatorio:      [{type: String}],
    nutricionista:      {type: ObjectId, ref: 'Nutricionistas'}

});

var Consulta = mongoose.model('Consultas', consultaSchema);
module.exports = Consulta;