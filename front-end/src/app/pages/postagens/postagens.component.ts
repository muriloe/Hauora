import { Exercicio } from './../../shared/model/exercicio.model';
import { PostagemService } from './postagem.service';
import { Postagem } from './../../shared/model/postagem.model';
import {OnInit, Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'ngx-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss'],
})

export class PostagensComponent implements OnInit {
    constructor(private postagemService: PostagemService) {}
    listaPostagens: Postagem[];
    listaPostagensOriginal: Postagem[];
    filtroAlimento: Boolean = true;
    filtroExercicio: Boolean = true;
    filtroDuvidas: Boolean = true;
    filtroVisualizadas: Boolean = true;
    filtroNaoVisualizadas: Boolean = true;


    ngOnInit() {
        this.getListaPostagem();
    }

    getListaPostagem() {
        this.postagemService.getPostagens()
        .subscribe(
            (listaPostagens: Postagem[]) => {
                this.listaPostagens = listaPostagens;
                this.listaPostagensOriginal = listaPostagens;
            },
        );
    }

    filtroAlimentoClicked() {
        if (this.filtroExercicio === false && this.filtroDuvidas === false) {

        }else {
            this.filtroAlimento = !this.filtroAlimento;
            this.filtrar();
        }
    }

    filtroExercicioClicked() {
        if (this.filtroAlimento === false && this.filtroDuvidas === false) {

        }else {
            this.filtroExercicio = !this.filtroExercicio;
            this.filtrar();
        }
    }

    filtroDuvidaClicked() {
        if (this.filtroAlimento === false && this.filtroExercicio === false) {

        }else {
            this.filtroDuvidas = !this.filtroDuvidas;
            this.filtrar();
        }
    }

    filtroVizualizadoClicked() {
        if (this.filtroNaoVisualizadas === false) {

        }else {
            this.filtroVisualizadas = !this.filtroVisualizadas;
            this.filtrar();
        }
    }

    filtroNaoVisualizadoClicked() {
        if (this.filtroVisualizadas === false) {

        }else {
            this.filtroNaoVisualizadas = !this.filtroNaoVisualizadas;
            this.filtrar();
        }
    }

    filtrar() {
        this.postagemService.getPostagens()
        .subscribe(
            (listaPostagens: Postagem[]) => {
                this.listaPostagens = listaPostagens;
                this.listaPostagensOriginal = listaPostagens;
                this.listaPostagens = this.listaPostagensOriginal;

                if (this.filtroNaoVisualizadas === true && this.filtroVisualizadas === true) {

                }
                if (this.filtroNaoVisualizadas === true && this.filtroVisualizadas === false) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem =>
                                    // tslint:disable-next-line:triple-equals
                                    Postagem.visualizado == false);
                }
                if (this.filtroVisualizadas === true && this.filtroNaoVisualizadas === false) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem =>
                                    // tslint:disable-next-line:triple-equals
                                    Postagem.visualizado == true);
                }

                if (this.filtroAlimento === false && this.filtroExercicio === true && this.filtroDuvidas === true) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.consumo == null);
                }
                if (this.filtroAlimento === false && this.filtroExercicio === false && this.filtroDuvidas === true) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.consumo == null && Postagem.exercicio == null);
                }
                if (this.filtroAlimento === true && this.filtroExercicio === false && this.filtroDuvidas === true) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.exercicio == null);
                }
                if (this.filtroAlimento === true && this.filtroExercicio === false && this.filtroDuvidas === false) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.exercicio == null && Postagem.duvida == null);
                }
                if (this.filtroAlimento === true && this.filtroExercicio === true && this.filtroDuvidas === false) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.duvida == null);
                }
                if (this.filtroAlimento === false && this.filtroExercicio === true && this.filtroDuvidas === false) {
                    this.listaPostagens = this.listaPostagens.filter(
                        // tslint:disable-next-line:no-shadowed-variable
                        Postagem => Postagem.duvida == null && Postagem.consumo == null);
                }
            },
        );
    }


}
