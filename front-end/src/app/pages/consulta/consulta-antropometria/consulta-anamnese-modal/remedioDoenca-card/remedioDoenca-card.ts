import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-remedio-doenca-card',
    template: `
    <div>
        <nb-card>
            <nb-card-body>
                <div class="col">
                    <div class="row">
                        <div><img [src]="icon"  max-height="60" max-width="60" width="40"></div>
                        <div class="col center">
                            <h6 class="text-success"><b>{{nome}}</b></h6>
                        </div>
                    </div>
                </div>
                <br>
                <h6 *ngIf="descricao"><b>Descrição</b></h6>
                <p *ngIf="descricao">{{descricao}}</p>
            </nb-card-body>
        </nb-card>
    </div>
    `,
})
export class RemedioDoencaCardComponent implements OnInit {
    @Input() icon: string;
    @Input() nome: string;
    @Input() descricao: string;

    ngOnInit(): void {
        
    }
}
