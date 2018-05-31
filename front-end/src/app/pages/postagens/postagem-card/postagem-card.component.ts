import { Postagem } from './../../../shared/model/postagem.model';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { PostagemModalComponent } from './postagem-modal/postagem-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostagemService } from '../postagem.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ngx-postagem-card',
  templateUrl: './postagem-card.component.html',
  styleUrls: ['./postagem-card.component.scss'],
})
export class PostagemCardComponent implements OnInit {

  constructor(private modalService: NgbModal, private postagemService: PostagemService) { }
    id;
    nome;
    data;
    imagem= 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
    imagemPost;
    tipoIcon;
    texto;
    qtdComentarios;
    visualizado= false;
    visualizadoIcon;
    @Input() postagem: Postagem;
    private timer;


    ngOnInit() {
      this.id = this.postagem._id;
      this.data = this.postagem.data;
      this.visualizado = this.postagem.visualizado;
      if (this.visualizado === true) {
        this.visualizadoIcon = 'assets/images/othersIcons/checkedTrue.png';
      }
      if (this.visualizado === false) {
        this.visualizadoIcon = 'assets/images/othersIcons/checkedFalse.png';
      }
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
      Observable.interval(10000).subscribe(x => {
        this.onTimeOut();
      });


    }

  abrirDetalhesDePostagem() {
    const activeModal = this.modalService.open(PostagemModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
    activeModal.componentInstance.postagem = this.postagem;
  }

  visualizadoClick() {
    if (this.visualizado === true) {
        this.visualizado = false;
        this.postagemService.atualizaStatus(this.id, this.visualizado).subscribe(
          (results: string[]) => {
            this.visualizadoIcon = 'assets/images/othersIcons/checkedFalse.png';
          },
        );
    } else {
        this.visualizado = true;
        this.postagemService.atualizaStatus(this.id, this.visualizado).subscribe(
          (results: string[]) => {
            this.visualizadoIcon = 'assets/images/othersIcons/checkedTrue.png';
          },
        );
    }
  }

  onTimeOut() {
    this.postagemService.atualizarPostagem(this.id)
      .subscribe(
          (postagem: Postagem) => {
              this.postagem = postagem;
              this.visualizado = postagem.visualizado;
              this.postagem.visualizado = postagem.visualizado;
              if (this.visualizado === true) {
                this.visualizadoIcon = 'assets/images/othersIcons/checkedTrue.png';
              }
              if (this.visualizado === false) {
                this.visualizadoIcon = 'assets/images/othersIcons/checkedFalse.png';
              }
              this.postagem.totalComentarios = postagem.totalComentarios;
              this.qtdComentarios = postagem.totalComentarios + ' comentários';
          },
      );
  }

}
