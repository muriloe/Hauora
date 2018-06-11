"use strict";
var Consumo = (function () {
    function Consumo(consumo) {
        this._id = consumo._id;
        this.texto = consumo.texto;
        this.data = consumo.data;
        this.sentimento = consumo.sentimento;
        this.observacao = consumo.observacao;
        this.tipo = consumo.tipo;
        this.anamneseId = consumo.anamnese;
    }
    return Consumo;
}());
exports.Consumo = Consumo;
