import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';

@Component({
  selector: 'ngx-postagem-card',
  templateUrl: './postagem-card.component.html',
  styleUrls: ['./postagem-card.component.scss'],
})
export class PostagemCardComponent implements OnInit {
     
  constructor() { }

    nome='teste';
    data='testesss';
    imagem='http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
  ngOnInit() {
    this.nome='teste';
    this.data='testesss';
    this.imagem='http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
  }

}
