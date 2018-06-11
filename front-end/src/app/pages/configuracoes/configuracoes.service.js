"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var server_1 = require('./../../shared/server');
var http_1 = require('@angular/http');
var ConfiguracoesService = (function () {
    function ConfiguracoesService(http) {
        this.http = http;
        this.serverUrl = new server_1.ServerInfo().getServerName();
    }
    ConfiguracoesService.prototype.atualizarSenha = function (idNutricionista, novaSenha) {
        var json = JSON.stringify({ _id: idNutricionista, senha: novaSenha });
        json = 'json=' + json;
        var cabe = new http_1.Headers();
        cabe.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.serverUrl + '/api/ataulizar/nutricionista', json, { headers: cabe })
            .map(function (res) { return res.json(); });
    };
    ConfiguracoesService = __decorate([
        core_1.Injectable()
    ], ConfiguracoesService);
    return ConfiguracoesService;
}());
exports.ConfiguracoesService = ConfiguracoesService;
