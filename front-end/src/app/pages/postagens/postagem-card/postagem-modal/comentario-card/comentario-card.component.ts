import { Postagem } from '../../../../../shared/model/postagem.model';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../../../shared/model/cliente.model';
import { PostagemModalComponent } from '../../postagem-modal/postagem-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostagemService } from '../../../postagem.service';
import { Comentario } from '../../../../../shared/model/comentario.model';

@Component({
    selector: 'ngx-comentario-card',
    templateUrl: './comentario-card.component.html',
    styleUrls: ['./comentario-card.component.scss'],
  })
  export class ComentarioCardComponent implements OnInit {

    constructor(private postagemService: PostagemService) { }

    @Input() comentario: Comentario;
    foto;
    nome;
    texto;
    data;

    ngOnInit() {
        this.texto = this.comentario.texto;
        this.data = this.comentario.data;
        if (this.comentario.nutricionista) {
            this.nome = this.comentario.nutricionista.nome;
            this.foto = this.comentario.nutricionista.foto;
        }
        if (this.comentario.cliente) {
            this.nome = this.comentario.cliente.nome;
            this.foto = this.comentario.cliente.foto;
        }
    }
  }


