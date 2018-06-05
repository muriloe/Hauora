import { EditarCardapioModalComponent } from './editar-cardapio-modal/editar-cardapio-modal.component';
import { VisualizarCardapioModalComponent } from './visualizar-consulta-modal/visualizar-consulta-modal.component';
import { Cardapio } from './../../shared/model/cardapio.model';
import { PerfilService } from './perfil.service';
import { Component, OnInit, Input } from '@angular/core';
import { Consulta } from '../../shared/model/consulta.model';
import { Cliente } from '../../shared/model/cliente.model';
import { ConsultaService } from '../consulta/consulta.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
  })

export class PerfilComponent implements OnInit {

  listaDeClientesBusca: Cliente[];
    @Input() selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    title = 'Busca Perfil';
    cardapios: Cardapio[] = [];
    cardapioCafeManha: Cardapio;
    cardapioLancheManha: Cardapio;
    cardapioAlmoco: Cardapio;
    cardapioLanche: Cardapio;
    cardapioJanta: Cardapio;
    exibirCardCardapio = false;
    consultas: Consulta[] = [];


    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        const clienteId = this.route.snapshot.queryParams['cliente'];
        this.usuarioSelecionado(clienteId)
    });
    }

    constructor(private modalService: NgbModal, private perfilService: PerfilService, private route: ActivatedRoute) {}


    buscarPacientes(nomePaciente) {
        this.perfilService.getClientes(nomePaciente)
                .subscribe(
                    (listaDeClientesBusca: Cliente[]) => {
                        this.listaDeClientesBusca = listaDeClientesBusca;
                    },
                );
    }

    usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.perfilService.getCliente(id)
            .subscribe(
                (results: Cliente) => {
                    this.cliente = results;
                    this.selecionouPaciente = true;
                    this.title = this.cliente.nome;
                    this.obterCardapios(this.cliente._id);
                    this.obterConsultas(this.cliente._id);
                },
            );
    }

    cancelaAnamnese() {
        this.selecionouPaciente = false;
        this.title = 'Busca Perfil';
    }
    
    obterConsultas(idCliente){
        this.perfilService.getConsultas(idCliente)
            .subscribe(
                (listaConsulta: Consulta[]) => {
                    this.consultas = listaConsulta;
                },
            );
    }

    obterCardapios(idCliente) {
        this.cardapioCafeManha = null;
        this.cardapioLancheManha = null;
        this.cardapioAlmoco = null;
        this.cardapioLanche = null;
        this.cardapioJanta = null;
        this.cardapios = null;
        this.exibirCardCardapio = false;


        this.perfilService.getCardapios(idCliente)
            .subscribe(
                (listaCardapios: Cardapio[]) => {
                    let contador = 0;
                    for (const cardapio of listaCardapios) {
                        if (cardapio.tipo  === 'CAFE_DA_MANHA') {
                            this.cardapioCafeManha = cardapio;
                            this.cardapioCafeManha.tipo = 'Café da manhã';
                            contador ++;
                        }
                        if (cardapio.tipo  === 'LANCHE_DA_MANHA') {
                            this.cardapioLancheManha = cardapio;
                            this.cardapioLancheManha.tipo = 'Lanche da manhã';
                            contador ++;
                        }
                        if (cardapio.tipo  === 'ALMOCO') {
                            this.cardapioAlmoco = cardapio;
                            this.cardapioAlmoco.tipo = 'Almoço';
                            contador ++;
                        }
                        if (cardapio.tipo  === 'LANCHE') {
                            this.cardapioLanche = cardapio;
                            this.cardapioLanche.tipo = 'Lanche';
                            contador ++;
                        }
                        if (cardapio.tipo  === 'JANTA') {
                            this.cardapioJanta = cardapio;
                            this.cardapioJanta.tipo = 'Janta';
                            contador ++;
                        }
                        if ( contador > 1) {
                            this.exibirCardCardapio = true;
                        }
                    }
                },
            );
    }

    alterarCardapio() {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(EditarCardapioModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.clienteId = this.cliente._id;

        activeModal.result.then((result) => {
            this.obterCardapios(this.cliente._id);
          }, (reason) => {
            this.obterCardapios(this.cliente._id);
          });
    }

    verConsulta(consulta){
        const activeModal = this.modalService.open(VisualizarCardapioModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.consulta = consulta;
        
    }

}
