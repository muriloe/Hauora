import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';

@Component({
  selector: 'ngx-postagem-card',
  templateUrl: './postagem-card.component.html',
  styleUrls: ['./postagem-card.component.scss'],
})
export class PostagemCardComponent implements OnInit {
     
  constructor() { }

    nome='Murilo Erhardt';
    data='15/03/2018 15:30';
    imagem='http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
    imagemPost="assets/images/examples/food.jpg";
  ngOnInit() {
  }

}
