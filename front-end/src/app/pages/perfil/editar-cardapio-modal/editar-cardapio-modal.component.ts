import { Composicao } from './../../../shared/model/composicao.model';
import { PerfilService } from './../perfil.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from '../../../shared/model/grupo.model';
import { Cardapio } from '../../../shared/model/cardapio.model';

@Component({
    selector: 'ngx-editar-cardapio-modal',
    templateUrl: './editar-cardapio-modal.component.html',
    styleUrls: ['./editar-cardapio-modal.component.scss'],
})
export class EditarCardapioModalComponent implements OnInit {
    clienteId: string;
    refeicaoSelecionada: string;
    imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
    imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
    imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
    imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
    imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';
    porcoes: string;
    grupos: Grupo[];
    grupoSelecionadoId: string;
    composicao_cafe_da_manha: Composicao[] = [];
    composicao_lanche_da_manha: Composicao[] = [];
    composicao_almoco: Composicao[] = [];
    composicao_lanche: Composicao[] = [];
    composicao_janta: Composicao[] = [];
    lista_composicao_selecionada: Composicao[] = [];

    constructor(private activeModal: NgbActiveModal, private perfilService: PerfilService) { }

    ngOnInit(): void {
       
        this.getGrupos();
        this.perfilService.getCardapios(this.clienteId)
            .subscribe(
                (listaCardapios: any[]) => {

                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'CAFE_DA_MANHA') {
                            for (const composicao of cardapio.composicoes){
                                const composicaoTemp = new Composicao(composicao);
                                composicaoTemp.grupo = composicao.grupo._id;
                                this.composicao_cafe_da_manha.push(composicaoTemp);
                            }
                        }

                    }
                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'LANCHE_DA_MANHA') {
                            for (const composicao of cardapio.composicoes){
                                const composicaoTemp = new Composicao(composicao);
                                composicaoTemp.grupo = composicao.grupo._id;
                                this.composicao_lanche_da_manha.push(composicaoTemp);
                            }
                        }

                    }
                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'ALMOCO') {
                            for (const composicao of cardapio.composicoes){
                                const composicaoTemp = new Composicao(composicao);
                                composicaoTemp.grupo = composicao.grupo._id;
                                this.composicao_almoco.push(composicaoTemp);
                            }
                        }

                    }
                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'LANCHE') {
                            for (const composicao of cardapio.composicoes){
                                const composicaoTemp = new Composicao(composicao);
                                composicaoTemp.grupo = composicao.grupo._id;
                                this.composicao_lanche.push(composicaoTemp);
                            }
                        }

                    }
                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'JANTA') {
                            for (const composicao of cardapio.composicoes){
                                const composicaoTemp = new Composicao(composicao);
                                composicaoTemp.grupo = composicao.grupo._id;
                                this.composicao_janta.push(composicaoTemp);
                            }
                        }

                    }
                    this.seleciouTipoRefeicao('CAFE_DA_MANHA');
                },
            );
    }

    getGrupos() {
        this.perfilService.getGrupos()
        .subscribe(
            (grupo: Grupo[]) => {
                this.grupos = grupo;
            },
        );
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

    addComposicao() {
        // tslint:disable-next-line:prefer-const
        if ((this.grupoSelecionadoId != null) && (this.porcoes != null)) {
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
        if (grupoId != null) {
            return this.grupos.find(x => x._id === grupoId).titulo;
        }
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
}
