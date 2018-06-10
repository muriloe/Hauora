import { PostagemService } from './../../postagens/postagem.service';
import { Composicao } from './../../../shared/model/composicao.model';
import { PerfilService } from './../perfil.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from '../../../shared/model/grupo.model';
import { Cardapio } from '../../../shared/model/cardapio.model';
import { Consulta } from '../../../shared/model/consulta.model';
import { Comentario } from '../../../shared/model/comentario.model';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { Nutricionista } from '../../../shared/model/nutricionista.model';


@Component({
    selector: 'ngx-visualizar-consulta-modal',
    templateUrl: './visualizar-consulta-modal.component.html',
    styleUrls: ['./visualizar-consulta-modal.component.scss'],
})
export class VisualizarCardapioModalComponent implements OnInit {

    nutricionista: Nutricionista;
    consulta: Consulta;
    peso: string;
    altura: string;
    gordura: string;
    imc: string;
    pesoIdeal: string;
    listaComentarios: Comentario[];
    comentario;
    validadorComentario = false;
    linkReqExame;
    linkRelatorioCompleto;

    // tslint:disable-next-line:max-line-length
    constructor(private activeModal: NgbActiveModal,
                private perfilService: PerfilService,
                private postagemService: PostagemService,
                private service: NbTokenService) {

                    service.get().subscribe((token: NbAuthJWTToken) => {
                        this.nutricionista = token.getPayload();
                      });

                }

    ngOnInit(): void {
        this.peso = this.consulta.peso + ' kg';
        this.altura = this.consulta.altura + ' m';
        this.gordura = this.consulta.percentualGordura + '%';
        this.imc = this.consulta.imc + ' kg/m2';
        this.pesoIdeal = this.consulta.pesoIdeal + ' kg';
        this.linkReqExame = this.consulta.linkExames;
        this.linkRelatorioCompleto = this.consulta.linkRelatorio;
        this.obterComentarios();

    }

    obterComentarios() {
        this.postagemService.obterComentarios(this.consulta._id)
        .subscribe(
            (listaComentarios: Comentario[]) => {
                this.listaComentarios = listaComentarios;
            },
        );
    }

    enviarComentario() {
        if (this.comentario == null) {
          this.validadorComentario = true;
        }else {
          // tslint:disable-next-line:max-line-length
          this.postagemService.postarComentarioConsulta(this.consulta._id, this.nutricionista._id, this.comentario).subscribe(
            (results: string[]) => {
              this.obterComentarios();
              this.comentario = null;
            },
          );
        }
      }

      closeModal() {
        this.activeModal.close();
    }

}
