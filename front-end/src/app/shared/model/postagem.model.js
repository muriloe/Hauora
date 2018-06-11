"use strict";
var Postagem = (function () {
    function Postagem(postagem) {
        this._id = postagem._id;
        this.linkFoto = postagem.linkFoto;
        this.cliente = postagem.cliente;
        this.exercicio = postagem.exercicio;
        this.duvida = postagem.duvida;
        this.consumo = postagem.consumo;
        this.totalComentarios = postagem.totalComentarios;
        this.data = postagem.data;
        this.visualizado = postagem.visualizado;
    }
    return Postagem;
}());
exports.Postagem = Postagem;
