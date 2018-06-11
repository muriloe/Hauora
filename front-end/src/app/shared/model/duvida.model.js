"use strict";
var Duvida = (function () {
    function Duvida(duvida) {
        this._id = duvida._id;
        this.data = duvida.data;
        this.texto = duvida.texto;
    }
    return Duvida;
}());
exports.Duvida = Duvida;
