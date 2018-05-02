import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-consumo-card',
    template: `
      <div>
        <nb-card>
          <nb-card-body>
            <div class="col">
              <div class="row">
                <div><img [src]="tipoIcon" height="40" width="40"></div>
                <div class="col">
                  <h6 class="text-info"><b>{{tipo}}</b></h6>
                  {{sentimento}}
                </div>
              </div>
            </div>
            <br>
            <h6 *ngIf="descricao"><b>Descrição</b></h6>
            <p *ngIf="descricao">{{descricao}}</p>
            <h6 *ngIf="comentario"><b>Comentário</b></h6>
            <p *ngIf="comentario">{{comentario}}</p>
            <div class="detail font-w-light">{{data | date: 'dd/MM/yyyy hh:mm'}} </div>
          </nb-card-body>
        </nb-card>
      </div>
    `,
})

export class ConsumoCardComponent implements OnInit {

    @Input() icon: string;
    @Input() tipo: string;
    @Input() sentimento: string;
    @Input() descricao: string;
    @Input() comentario: string;
    @Input() data: Date;
    tipoIcon: string;

    ngOnInit(): void {
      this.sentimento = 'Sentindo-se ' + this.sentimento;
      if (this.tipo === 'CAFE_DA_MANHA') {
        // tslint:disable-next-line:quotemark
        this.tipoIcon = "assets/images/mealIcons/breakfastIcon.png";
        this.tipo = 'Café da manhã';
      }
      if (this.tipo === 'LANCHE_DA_MANHA') {
         // tslint:disable-next-line:quotemark
        this.tipoIcon = "assets/images/mealIcons/snackIcon.png";
        this.tipo = 'Lanche';
      }
      if (this.tipo === 'ALMOCO') {
         // tslint:disable-next-line:quotemark
        this.tipoIcon = "assets/images/mealIcons/lunchIcon.png";
        this.tipo = 'Almoço';
      }
      if (this.tipo === 'JANTA') {
         // tslint:disable-next-line:quotemark
        this.tipoIcon = "assets/images/mealIcons/dinnerIcon.png";
        this.tipo = 'Janta';
      }
      if (this.tipo === 'LANCHE') {
         // tslint:disable-next-line:quotemark
        this.tipoIcon = "assets/images/mealIcons/snackIcon.png";
        this.tipo = 'Lanche';
      }
    }
}
