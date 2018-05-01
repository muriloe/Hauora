import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-consulta-anamnese-model',
    templateUrl: './consulta-anamnese-modal.component.html',
  })

export class ConsultaAnamneseModalComponent {
    constructor(private activeModal: NgbActiveModal) { }

    closeModal() {
        this.activeModal.close();
    }
}
