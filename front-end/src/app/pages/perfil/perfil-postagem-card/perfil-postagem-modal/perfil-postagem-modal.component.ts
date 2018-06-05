import { Comentario } from './../../../../shared/model/comentario.model';
import { Postagem } from './../../../../shared/model/postagem.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Nutricionista } from '../../../../shared/model/nutricionista.model';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { PostagemService } from '../../../postagens/postagem.service';

@Component({
    selector: 'ngx-perfil-postagem-modal',
    templateUrl: './perfil-postagem-modal.component.html',
    styleUrls: ['./perfil-postagem-modal.component.scss'],
})

export class PerfilPostagemModalComponent implements OnInit {
    nutricionista: Nutricionista;
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
    listaComentarios: Comentario[];
    comentario;
    validadorComentario = false;

    constructor(private activeModal: NgbActiveModal,
                private postagemService: PostagemService,
                private service: NbTokenService) {
                  service.get().subscribe((token: NbAuthJWTToken) => {
                    this.nutricionista = token.getPayload();
                  });
                }

    ngOnInit(): void {
        this.id = this.postagem._id;
        this.obterComentarios();
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

    }

    obterComentarios() {
      this.postagemService.obterComentarios(this.id)
      .subscribe(
          (listaComentarios: Comentario[]) => {
              this.listaComentarios = listaComentarios;
          },
      );
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

    enviarComentario() {
      if (this.comentario == null) {
        this.validadorComentario = true;
      }else {
        this.postagemService.postarComentario(this.id, this.nutricionista._id, this.comentario).subscribe(
          (results: string[]) => {
            this.obterComentarios();
            this.comentario = null;
            // tslint:disable-next-line:radix
            if (parseInt(this.qtdComentarios)) {
              // tslint:disable-next-line:radix
              this.qtdComentarios = parseInt(this.qtdComentarios) + 1;
              this.qtdComentarios = this.qtdComentarios + ' comentários';
            } else {
              this.qtdComentarios = '1 comentário';
            }
          },
        );
      }
    }

}
