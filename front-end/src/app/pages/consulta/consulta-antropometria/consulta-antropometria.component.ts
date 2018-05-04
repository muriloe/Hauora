import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { ConsultaService } from '../consulta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaAnamneseModalComponent } from './consulta-anamnese-modal/consulta-anamnese-modal.component';

@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {
    pacienteSelecionado: any;
    selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];
    listaDeClientesBusca: Cliente[];

    peso: number;
    altura: number;
    gordura: number;
    imc: number;
    pesoIdeal: number;

    refeicaoSelecionada: string;
    imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
    imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
    imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
    imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
    imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';

    constructor(private consultaService: ConsultaService, private modalService: NgbModal) { }

    ngOnInit() {
        this.selecionouPaciente = false;
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
        } else {
        }
    }

    showModelAnamnese(id) {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaAnamneseModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.userId = id;
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
        }
        if (tipoRefeicao === 'LANCHE_DA_MANHA') {
            this.imagem_lanche_da_manha = 'assets/images/mealIcons/snackIconBlue.png';
        }
        if (tipoRefeicao === 'ALMOCO') {
            this.imagem_almoco = 'assets/images/mealIcons/lunchIconBlue.png';
        }
        if (tipoRefeicao === 'LANCHE') {
            this.imagem_lanche = 'assets/images/mealIcons/snackIconBlue.png';
        }
        if (tipoRefeicao === 'JANTA') {
            this.imagem_janta = 'assets/images/mealIcons/dinnerIconBlue.png';
        }
    }

}
