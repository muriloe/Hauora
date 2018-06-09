import { Consulta } from './../../../shared/model/consulta.model';
import { Grupo } from './../../../shared/model/grupo.model';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { Composicao } from './../../../shared/model/composicao.model';
import { ConsultaService } from '../consulta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaAnamneseModalComponent } from './consulta-anamnese-modal/consulta-anamnese-modal.component';
import { ConsultaGruposModalComponent } from './consulta-grupos-modal/consulta-grupo-modal.component';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { Nutricionista } from '../../../shared/model/nutricionista.model';
import { Cardapio } from '../../../shared/model/cardapio.model';
import { Router } from '@angular/router';


@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {
    pacienteSelecionado: any;
    @Input() selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];
    listaDeClientesBusca: Cliente[];

    peso: number;
    altura: number;
    gordura: number;
    imc: number;
    pesoIdeal: number = 0;
    deficiencias: string;
    excessos: string;
    observacoes: string;
    composicao_cafe_da_manha: Composicao[] = [];
    composicao_lanche_da_manha: Composicao[] = [];
    composicao_almoco: Composicao[] = [];
    composicao_lanche: Composicao[] = [];
    composicao_janta: Composicao[] = [];
    lista_composicao_selecionada: Composicao[] = [];

    refeicaoSelecionada: string;
    imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
    imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
    imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
    imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
    imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';

    grupos: Grupo[];
    porcoes: string;
    grupoSelecionadoId: string;

    nutricionista: Nutricionista;

    validadorPeso: boolean = false;
    validadorAltura: boolean = false;
    validadorGordura: boolean = false;
    validadorCardapio: boolean = false;

    validadorCadastroNome: boolean = false;
    validadorCadastroNascimento: boolean = false;
    validadorCadastroEmail: boolean = false;
    validadorCadastroTelefone: boolean = false;
    validadorCadastroSexo: boolean = false;
    validadorCadastroObjetivo: boolean = false;

    cadastroNome: string;
    cadastroNascimento: string;
    cadastroSexo: string;
    cadastroObjetivo: string;
    cadastroEmail: string;
    cadastroTelefone: string;

    listaDeConsulta: Consulta[] = [];
    indice = 0;
    ativarBotaoCarregarMais: boolean = true;



    constructor(private consultaService: ConsultaService,
                private modalService: NgbModal,
                private service: NbTokenService,
                private router: Router ) {
                    // tslint:disable-next-line:no-shadowed-variable
                    service.get().subscribe((token: NbAuthJWTToken) => {
                        this.nutricionista = token.getPayload();
                    });
                }

    ngOnInit() {
        this.selecionouPaciente = false;
        this.seleciouTipoRefeicao('CAFE_DA_MANHA');
        this.getGrupos();
        this.getConsultas();
    }

    buscarPacientes(nomePaciente) {
      this.consultaService.getClientes(nomePaciente)
              .subscribe(
                  (listaDeClientesBusca: Cliente[]) => {
                      this.listaDeClientesBusca = listaDeClientesBusca;
                  },
              );
    }

    usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(id)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                      this.selecionouPaciente = true;
                  },
              );
    }

    cancelaAnamnese() {
        if (confirm('Fazendo isso você perdera todos os dados da consulta')) {
            this.selecionouPaciente = false;
            // this.router.navigate(['pages/consulta']);
        } else {
        }
    }

    showModalAnamnese(id) {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaAnamneseModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.userId = id;
    }

    showGruposModal() {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaGruposModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';

    }

    calculaIMC() {
        if (this.peso != null) {
            if (this.altura != null) {
               this.imc = this.peso / ( this.altura * this.altura );
            }
        }
    }

    seleciouTipoRefeicao(tipoRefeicao) {
        this.alterarIconeRefeicao(tipoRefeicao);
        this.refeicaoSelecionada = tipoRefeicao;
    }

    // Pega o tipo de refeição, seta todos os icones para a cor padrão e
    // coloca somente o item selecionado na cor
    alterarIconeRefeicao(tipoRefeicao) {
        this.imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
        this.imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
        this.imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
        this.imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
        this.imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';
        if (tipoRefeicao === 'CAFE_DA_MANHA') {
            this.imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_cafe_da_manha;
        }
        if (tipoRefeicao === 'LANCHE_DA_MANHA') {
            this.imagem_lanche_da_manha = 'assets/images/mealIcons/snackIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_lanche_da_manha;
        }
        if (tipoRefeicao === 'ALMOCO') {
            this.imagem_almoco = 'assets/images/mealIcons/lunchIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_almoco;
        }
        if (tipoRefeicao === 'LANCHE') {
            this.imagem_lanche = 'assets/images/mealIcons/snackIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_lanche;
        }
        if (tipoRefeicao === 'JANTA') {
            this.imagem_janta = 'assets/images/mealIcons/dinnerIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_janta;
        }
    }

    getGrupos() {
        this.consultaService.getGrupos()
        .subscribe(
            (grupo: Grupo[]) => {
                this.grupos = grupo;
            },
        );
    }

    getConsultas() {
        this.consultaService.buscarConsultas(this.indice)
        .subscribe(
            (consulta: Consulta[]) => {

                this.listaDeConsulta = consulta;
                if (consulta.length !== 10) {
                    this.ativarBotaoCarregarMais = false;
                } else {
                    this.indice = this.indice + 10;
                }
            },
        );
    }

    carregarMais() {
        this.consultaService.buscarConsultas(this.indice)
        .subscribe(
            (consultas: Consulta[]) => {

                for (const consulta of consultas) {
                    this.listaDeConsulta.push(consulta);
                }
                if (consultas.length !== 11) {
                    this.ativarBotaoCarregarMais = false;
                } else {
                    this.indice = this.indice + 10;
                }
            },
        );
    }

    addComposicao() {
        // tslint:disable-next-line:prefer-const
        if ((this.grupoSelecionadoId != null) &&
            (this.porcoes != null) &&
            // tslint:disable-next-line:radix
            (parseInt(this.porcoes) > 0)) {
            const composicaoTemp = new Composicao({grupo: this.grupoSelecionadoId, quantidade: this.porcoes});
            this.checkTipoRefeicaoEArmazena(composicaoTemp);
            this.grupoSelecionadoId = null;
            this.porcoes = null;
        }else {
            alert('Preencher os campos corretamente');
        }
    }

    checkTipoRefeicaoEArmazena(composicao) {
        if (this.refeicaoSelecionada === 'CAFE_DA_MANHA') {
            this.composicao_cafe_da_manha.push(composicao);
        }
        if (this.refeicaoSelecionada === 'LANCHE_DA_MANHA') {
            this.composicao_lanche_da_manha.push(composicao);
        }
        if (this.refeicaoSelecionada === 'ALMOCO') {
            this.composicao_almoco.push(composicao);
        }
        if (this.refeicaoSelecionada === 'LANCHE') {
            this.composicao_lanche.push(composicao);
        }
        if (this.refeicaoSelecionada === 'JANTA') {
            this.composicao_janta.push(composicao);
        }
    }

    getTituloGrupoPorId(grupoId) {
        return this.grupos.find(x => x._id === grupoId).titulo;
    }

    deletarComposicao(composicao) {
        if (this.refeicaoSelecionada === 'CAFE_DA_MANHA') {
            const index: number = (this.composicao_cafe_da_manha.indexOf(composicao));
            this.composicao_cafe_da_manha.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'LANCHE_DA_MANHA') {
            const index: number = (this.composicao_lanche_da_manha.indexOf(composicao));
            this.composicao_lanche_da_manha.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'ALMOCO') {
            const index: number = (this.composicao_almoco.indexOf(composicao));
            this.composicao_almoco.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'LANCHE') {
            const index: number = (this.composicao_lanche.indexOf(composicao));
            this.composicao_lanche.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'JANTA') {
            const index: number = (this.composicao_janta.indexOf(composicao));
            this.composicao_janta.splice(index, 1);
        }
    }

    finalizarConsulta() {


        if (this.validarCampos() === true) {
            const consulta = new Consulta('');
            consulta.peso = this.peso.toString();
            consulta.pesoIdeal = this.pesoIdeal.toString();
            consulta.altura = this.altura.toString();
            consulta.percentualGordura = this.gordura.toString();
            consulta.imc = this.imc.toString();
            consulta.deficiencias = this.deficiencias;
            consulta.excessos = this.excessos;
            // consulta.linkExames = this.linkExames;
            // consulta.linkRelatorio = this.linkRelatorio;
            consulta.observacoes = this.observacoes;
            consulta.cliente = this.cliente._id;
            consulta.nutricionista = this.nutricionista._id;


            this.consultaService.postConsulta(  consulta,
                                                this.composicao_cafe_da_manha,
                                                this.composicao_lanche_da_manha,
                                                this.composicao_almoco,
                                                this.composicao_lanche,
                                                this.composicao_janta).subscribe(
                                                    (results: string[]) => {
                                                        // tslint:disable-next-line:max-line-length
                                                        if (confirm('Consulta realizada com sucesso!\n Em breve o paciente recebera uma email com a nova senha')) {
                                                            this.router.navigate(['pages/clientes']);
                                                        } else {
                                                        }
                                                    },
                                                );
        }
    }

    validarCampos() {
        let contadorDeComposicao = 0;
        let hasErrors: Boolean;
        let mensagemErro = 'Para finalizar uma consulta você deve preencher: \n';
        if (this.peso == null) {
            this.validadorPeso = true;
            mensagemErro += '-Peso\n';
            hasErrors = true;
        }
        if (this.altura == null) {
            this.validadorAltura = true;
            mensagemErro += '-Altura\n';
            hasErrors = true;
        }
        if (this.gordura == null) {
            this.validadorGordura = true;
            mensagemErro += '-Gordura\n';
            hasErrors = true;
        }

        if (this.composicao_cafe_da_manha.length > 0) {
            contadorDeComposicao++;
        }
        if (this.composicao_lanche_da_manha.length > 0) {
            contadorDeComposicao++;
        }
        if (this.composicao_almoco.length > 0) {
            contadorDeComposicao++;
        }
        if (this.composicao_lanche.length > 0) {
            contadorDeComposicao++;
        }
        if (this.composicao_janta.length > 0) {
            contadorDeComposicao++;
        }
        if (contadorDeComposicao < 3) {
            this.validadorCardapio = true;
            mensagemErro += '- É necessário criar pelo menos três refeições diárias\n';
            hasErrors = true;
        }
        if (hasErrors) {
            alert(mensagemErro);
            return false;
        }else {
            return true;
        }
    }

    criarCliente() {
        if (this.validarNovoCliente() === true) {
            const cliente = new Cliente('');
            cliente.nome = this.cadastroNome;
            cliente.data_nascimento = new Date(this.cadastroNascimento);
            cliente.sexo = this.cadastroSexo;
            cliente.objetivo = this.cadastroObjetivo;
            cliente.email = this.cadastroEmail;
            cliente.telefone = this.cadastroTelefone;

            this.consultaService.criarPaciente(cliente).subscribe(
                (results: string[]) => {
                    // tslint:disable-next-line:max-line-length
                    if (confirm('Novo cliente foi craido com sucesso!\n Já é possível realizar uma consulta e após isso o cliente terá acesso ao aplicativo')) {
                        this.router.navigate(['pages/consulta']);
                    } else {
                        window.alert('Email já está sendo usado');
                    }
                },
            );
        }
    }

    validarNovoCliente() {
        let hasErrors: Boolean;
        const dataNasc = new Date(this.cadastroNascimento);
        if (!this.cadastroNome) {
            this.validadorCadastroNome = true;
            hasErrors = true;
        }else {
            this.validadorCadastroNome = false;
        }
        if (!dataNasc) {
            this.validadorCadastroNascimento = true;
            hasErrors = true;
        }else {
            this.validadorCadastroNascimento = false;
        }
        if (!this.cadastroEmail) {
            this.validadorCadastroEmail = true;
            hasErrors = true;
        }else {
            this.validadorCadastroEmail = false;
        }
        if (!this.cadastroTelefone) {
            this.validadorCadastroTelefone = true;
            hasErrors = true;
        }else {
            this.validadorCadastroTelefone = false;
        }
        if (this.cadastroSexo == null) {
            this.validadorCadastroSexo = true;
            hasErrors = true;
        }else {
            this.validadorCadastroSexo = false;
        }
        if (this.cadastroObjetivo == null) {
            this.validadorCadastroObjetivo = true;
            hasErrors = true;
        }else {
            this.validadorCadastroObjetivo = false;
        }
        const dataAgora = new Date();

        if (dataNasc > dataAgora ) {
            this.validadorCadastroNascimento = true;
            hasErrors = true;
        }else {
            this.validadorCadastroNascimento = false;
        }

        if (hasErrors) {
            return false;
        }else {
            return true;
        }
    }

    validarForm() {
        this.validarNovoCliente();
    }

}
