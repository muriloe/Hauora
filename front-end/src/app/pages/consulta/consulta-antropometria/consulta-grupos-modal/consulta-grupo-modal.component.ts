import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaService } from '../../consulta.service';
import { Grupo } from '../../../../shared/model/grupo.model';
import { Alimento } from './../../../../shared/model/alimento.model';

@Component({
    selector: 'ngx-consulta-grupos-model',
    templateUrl: './consulta-grupo-modal.component.html',
})
export class ConsultaGruposModalComponent implements OnInit {

    grupos: Grupo[];
    alimentos: Alimento[];

    constructor(private activeModal: NgbActiveModal, private consultaService: ConsultaService) { }

    ngOnInit(): void {
        this.getGrupos();
    }

    getGrupos() {
        this.consultaService.getGrupos()
        .subscribe(
            (grupo: Grupo[]) => {
                this.grupos = grupo;
            },
        );
    }

    closeModal() {
        this.activeModal.close();
    }


}
