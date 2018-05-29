import { Postagem } from './../../../shared/model/postagem.model';
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
    data;
    imagem= 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
    imagemPost;
    tipoIcon;
    texto;
    qtdComentarios;
    @Input() postagem: Postagem;

    ngOnInit() {
      this.data = this.postagem.data;
      if (this.postagem.linkFoto) {
        this.imagemPost = this.postagem.linkFoto;
      }
      this.data = this.postagem.data;
      if (this.postagem.consumo) {
        this.tipoIcon = 'assets/images/othersIcons/consumo.png';
        this.texto = this.postagem.consumo.texto;
      }
      if (this.postagem.exercicio) {
        this.tipoIcon = 'assets/images/othersIcons/exercicio.png';
        this.texto = this.postagem.exercicio.texto;
      }
      if (this.postagem.duvida) {
        this.tipoIcon = 'assets/images/othersIcons/duvida.png';
        this.texto = this.postagem.duvida.texto;
      }
      if (this.postagem.totalComentarios ) {
        this.qtdComentarios = this.postagem.totalComentarios + ' comentários';
      }else {
        this.qtdComentarios = 'Nenhum comentário';
      }
      if ( this.postagem.cliente[0]) {
        this.nome = this.postagem.cliente[0].nome;
        this.imagem = this.postagem.cliente[0].foto;
      }


    }

  abrirDetalhesDePostagem() {
    const activeModal = this.modalService.open(PostagemModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
