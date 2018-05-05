import { Alimento } from './../../../../shared/model/alimento.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaService } from '../../consulta.service';

@Component({
    selector: 'ngx-alimentos-card',
    template: `
      <div *ngFor="let alimento of alimentos">
        {{alimento.nome}}{{alimento.porcao}}
      </div>
    `,
})
export class AlimentosCardComponent implements OnInit {
    @Input() grupoId: string;
    alimentos: Alimento[];

    constructor(private activeModal: NgbActiveModal, private consultaService: ConsultaService) { }

    ngOnInit(): void {
        this.getAlimentos(this.grupoId);
    }


    getAlimentos(groupId) {
        this.consultaService.getAlimentos(groupId)
        .subscribe(
            (alimento: Alimento[]) => {
                this.alimentos = alimento;
            },
        );
    }
}
