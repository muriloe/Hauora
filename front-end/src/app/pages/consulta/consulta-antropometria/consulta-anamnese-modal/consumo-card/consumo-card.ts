import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-consumo-card',
    template: `
      <div>
        <nb-user [picture]="tipoIcon" [name]="tipo" [title]="sentimento" size="large"></nb-user>
      </div>
    `,
})

export class ConsumoCardComponent implements OnInit {
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

    @Input() icon: string;
    @Input() tipo: string;
    @Input() sentimento: string;
    @Input() descrição: string;
    @Input() comentario: string;
    @Input() data: Date;
    tipoIcon: string;
}
