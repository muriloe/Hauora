"use strict";
var Cliente = (function () {
    function Cliente(cliente) {
        this._id = cliente._id;
        this.nome = cliente.nome;
        this.nome_mae = cliente.nome_mae;
        this.email = cliente.email;
        this.senha = cliente.senha;
        this.sexo = cliente.sexo;
        this.data_nascimento = cliente.data_nascimento;
        this.telefone = cliente.telefone;
        this.foto = cliente.foto;
        this.objetivo = cliente.objetivo;
        this.acesso = cliente.acesso;
    }
    Cliente.prototype.setNome = function (nome) {
        this.nome = nome;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
