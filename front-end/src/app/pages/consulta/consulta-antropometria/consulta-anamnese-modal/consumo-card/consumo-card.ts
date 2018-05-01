import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-consumo-card',
    template: `
      <div>
        <nb-user [name]="tipo" [title]="sentimento" size="large"></nb-user>
      </div>
    `,
})

export class ConsumoCardComponent {
    @Input() icon: string;
    @Input() tipo: string;
    @Input() sentimento: string;
    @Input() descrição: string;
    @Input() comentario: string;
    @Input() data: Date;
}
