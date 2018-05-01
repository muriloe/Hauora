import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-consulta-anamnese-model',
    templateUrl: './consulta-anamnese-view.component.html',
  })

export class ConsultaAnamneseViewComponent {
    constructor(private activeModal: NgbActiveModal) { }

    closeModal() {
        this.activeModal.close();
    }
}
