import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { PostagemModalComponent } from './postagem-modal/postagem-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-postagem-card',
  templateUrl: './postagem-card.component.html',
  styleUrls: ['./postagem-card.component.scss'],
})
export class PostagemCardComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

    nome= 'Murilo Erhardt';
    data= '15/03/2018 15:30';
    imagem= 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
    imagemPost= 'assets/images/examples/food.jpg';
  ngOnInit() {
  }

  abrirDetalhesDePostagem() {
    const activeModal = this.modalService.open(PostagemModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
