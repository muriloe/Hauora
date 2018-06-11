"use strict";
var Comentario = (function () {
    function Comentario(duvida) {
        this._id = duvida._id;
        this.data = duvida.data;
        this.texto = duvida.texto;
        this.link_arquivo = duvida.link_arquivo;
        this.cliente = duvida.cliente;
        this.postagem_id = duvida.postagem_id;
        this.consulta_id = duvida.consulta_id;
        this.nutricionista = duvida.nutricionista;
    }
    return Comentario;
}());
exports.Comentario = Comentario;
