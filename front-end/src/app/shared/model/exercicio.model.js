"use strict";
var Exercicio = (function () {
    function Exercicio(exercicio) {
        this._id = exercicio._id;
        this.data = exercicio.data;
        this.texto = exercicio.texto;
    }
    return Exercicio;
}());
exports.Exercicio = Exercicio;
