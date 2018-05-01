import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Remedio } from '../../../../shared/model/remedio.model';
import { Doenca } from './../../../../shared/model/doenca.model';
import { Consumo } from './../../../../shared/model/consumo.model';
import { Cliente } from './../../../../shared/model/cliente.model';
import { Anamnese } from './../../../../shared/model/anamnese.model';
import { ConsultaService } from '../../consulta.service';

@Component({
    selector: 'ngx-consulta-anamnese-model',
    templateUrl: './consulta-anamnese-modal.component.html',
  })

export class ConsultaAnamneseModalComponent implements OnInit {
    userId: string;
    cliente: Cliente;
    anamnese: Anamnese
    consumos: Consumo[];
    remedios: Remedio[];
    doencas: Doenca[];

    constructor(private activeModal: NgbActiveModal, private consultaService: ConsultaService) { }

    ngOnInit(): void {
        this.getAnamneseUsuario();
        this.getClienteInfo();
    }

    closeModal() {
        this.activeModal.close();
    }

    getAnamneseUsuario() {
        this.consultaService.getAnamnese(this.userId)
              .subscribe(
                  (anamnese: Anamnese) => {
                      this.anamnese = anamnese;
                      this.getRemedios();
                      this.getDoencas();
                      this.getConsumos();
                  },
              );
    }

    getClienteInfo() {
        this.consultaService.getCliente(this.userId)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                  },
            );
    }

    getRemedios() {
        this.consultaService.getRemedios(this.anamnese._id)
        .subscribe(
            (results: Remedio[]) => {
                this.remedios = results;
            },
      );
    }

    getDoencas() {
        this.consultaService.getDoencas(this.anamnese._id)
        .subscribe(
            (results: Doenca[]) => {
                this.doencas = results;
            },
      );
    }

    getConsumos() {
        this.consultaService.getConsumos(this.anamnese._id)
        .subscribe(
            (results: Consumo[]) => {
                this.consumos = results;
            },
      );
    }

}
