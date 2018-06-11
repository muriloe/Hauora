"use strict";
var Nutricionista = (function () {
    function Nutricionista(cliente) {
        this._id = cliente._id;
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.senha = cliente.senha;
        this.sexo = cliente.sexo;
        this.data_nascimento = cliente.data_nascimento;
        this.telefone = cliente.telefone;
        this.foto = cliente.foto;
    }
    Nutricionista.prototype.setNome = function (nome) {
        this.nome = nome;
    };
    return Nutricionista;
}());
exports.Nutricionista = Nutricionista;
