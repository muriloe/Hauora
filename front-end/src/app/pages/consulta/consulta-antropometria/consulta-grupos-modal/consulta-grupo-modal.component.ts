import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaService } from '../../consulta.service';

@Component({
    selector: 'ngx-consulta-grupos-model',
    templateUrl: './consulta-grupo-modal.component.html',
})
export class ConsultaGruposModalComponent implements OnInit {

    constructor(private activeModal: NgbActiveModal, private consultaService: ConsultaService) { }

    ngOnInit(): void {

    }
}
