import { PostagemService } from './../../postagem.service';
import { Postagem } from './../../../../shared/model/postagem.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-postagem-modal',
    templateUrl: './postagem-modal.component.html',
    styleUrls: ['./postagem-modal.component.scss'],
})

export class PostagemModalComponent implements OnInit {
    postagem: Postagem;
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
    constructor(private activeModal: NgbActiveModal, private postagemService: PostagemService) { }

    ngOnInit(): void {
        this.id = this.postagem._id;
        this.data = this.postagem.data;
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

    closeModal() {
        this.activeModal.close();
    }

}
