import { Comentario } from './../../../../shared/model/comentario.model';
import { PostagemService } from './../../../postagens/postagem.service';
import { Postagem } from '../../../../shared/model/postagem.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../../shared/model/cliente.model';

@Component({
    selector: 'ngx-comentario-consulta-card',
    templateUrl: './comentario-consulta-card.component.html',
    styleUrls: ['./comentario-consulta-card.component.scss'],
  })
  export class ComentarioConsultaCardComponent implements OnInit {

    constructor(private postagemService: PostagemService) { }

    @Input() comentario: Comentario;
    foto;
    nome;
    texto;

    ngOnInit() {
        this.texto = this.comentario.texto;
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


