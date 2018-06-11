"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ConfiguracoesComponent = (function () {
    function ConfiguracoesComponent(configuracoesService, router, service) {
        var _this = this;
        this.configuracoesService = configuracoesService;
        this.router = router;
        this.service = service;
        this.validadorSenhaAtual = false;
        this.validadorNovaSenha = false;
        this.validadorConfirmaSenha = false;
        service.get().subscribe(function (token) {
            _this.nutricionista = token.getPayload();
        });
    }
    ConfiguracoesComponent.prototype.ngOnInit = function () {
        this.nome = this.nutricionista.nome;
        this.email = this.nutricionista.email;
    };
    ConfiguracoesComponent.prototype.onInserFoto = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            var file_1 = event.target.files[0];
            reader.readAsDataURL(file_1);
            reader.onload = function () {
                var exema = ({
                    filetype: file_1.type,
                    value: reader.result.split(',')[1]
                });
                if (exema.filetype !== 'application/pdf') {
                    alert('Só é aceito formato PDF');
                    _this.inputReqExame.nativeElement.value = '';
                }
                else {
                    _this.fotoBase = exema;
                }
            };
        }
    };
    ConfiguracoesComponent.prototype.alterarSenha = function () {
        var _this = this;
        if (!this.validarCamposSenha()) {
            this.configuracoesService.atualizarSenha(this.nutricionista._id, this.confirmaSenha).subscribe(function (results) {
                console.log("deu boa");
                alert("Senha modificada com sucesso");
                _this.router.navigate(['auth/logout']);
            });
        }
    };
    ConfiguracoesComponent.prototype.validarCamposSenha = function () {
        var hasErrors = false;
        if (this.confirmaSenha !== this.novaSenha) {
            alert('Senhas não conferem');
            this.validadorNovaSenha = true;
            this.validadorConfirmaSenha = true;
            hasErrors = true;
        }
        if (!this.senhaAtual) {
            alert('Preencher todos os campos');
            this.validadorSenhaAtual = true;
            hasErrors = true;
        }
        if (!this.novaSenha) {
            alert('Preencher todos os campos');
            this.validadorNovaSenha = true;
            hasErrors = true;
        }
        if (!this.confirmaSenha) {
            alert('Preencher todos os campos');
            this.validadorConfirmaSenha = true;
            hasErrors = true;
        }
        if (this.confirmaSenha.length < 6) {
            alert('Senha precisa ter no mínimo 6 e no máximo 20 cararcteres');
            hasErrors = true;
        }
        console.log(this.nutricionista);
        if (this.nutricionista.senha !== this.senhaAtual) {
            alert('A senha atual não é a correta');
            hasErrors = true;
        }
        return hasErrors;
    };
    __decorate([
        core_1.ViewChild('reqFoto')
    ], ConfiguracoesComponent.prototype, "inputReqExame");
    ConfiguracoesComponent = __decorate([
        core_1.Component({
            selector: 'ngx-configuracoes',
            templateUrl: './configuracoes.component.html',
            styleUrls: ['./configuracoes.component.scss']
        })
    ], ConfiguracoesComponent);
    return ConfiguracoesComponent;
}());
exports.ConfiguracoesComponent = ConfiguracoesComponent;
