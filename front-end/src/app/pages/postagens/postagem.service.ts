import { Postagem } from './../../shared/model/postagem.model';
import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ServerInfo } from './../../shared/server';
import { Headers } from '@angular/http';
import { Comentario } from '../../shared/model/comentario.model';
@Injectable()
export class PostagemService {
    constructor(private http: Http) {}
    // Variável utlizada para armazena o endereço do servidor
    private serverUrl = new ServerInfo().getServerName();
    private postagens: Postagem[] = [];
    private comentarios: Comentario[] = [];
    private postagem: Postagem;


    getPostagens () {
        return this.http.get(this.serverUrl + '/api/postagens/todas')
            .map((response: Response) => {
                const postagensResponse = response.json().obj;
                this.postagens = [];

                for (const postagem of postagensResponse) {
                    this.postagens.push(new Postagem(postagem));
                }
                return this.postagens;
            })
            .catch((error: Response) => Observable.throw(error));
    }


    atualizaStatus(idPost, status) {

            let json = JSON.stringify({_id: idPost, visualizado: status});
            json = 'json=' + json;
            const cabe = new Headers();
            cabe.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(this.serverUrl + '/api/statusPostagem',
            json, {headers : cabe})
                .map(res => res.json());
    }

    obterComentarios(id) {
        return this.http.get(this.serverUrl + '/api/comentarios/web/' + id)
        .map((response: Response) => {
            const comentarioResponse = response.json();
            this.comentarios = [];

            for (const comentarios of comentarioResponse) {
                this.comentarios.push(new Comentario(comentarios));
            }
            return this.comentarios;
        })
        .catch((error: Response) => Observable.throw(error));
    }

    postarComentario(idPost, idNutricionista, comentario) {

        let json = JSON.stringify({postagem_id: idPost, nutricionista_id: idNutricionista, texto: comentario});
        json = 'json=' + json;
        const cabe = new Headers();
        cabe.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.serverUrl + '/api/comentarios/web/save',
        json, {headers : cabe})
            .map(res => res.json());
    }

    atualizarPostagem(idPostagem) {
        return this.http.get(this.serverUrl + '/api/postagens/' + idPostagem)
        .map((response: Response) => {
            const postagemResponse = response.json();
            this.postagem = postagemResponse.obj[0];
            return this.postagem;
        })
        .catch((error: Response) => Observable.throw(error));
    }

    postarComentarioConsulta(idConsulta, idNutricionista, comentario) {

        let json = JSON.stringify({consulta_id: idConsulta, nutricionista_id: idNutricionista, texto: comentario});
        json = 'json=' + json;
        const cabe = new Headers();
        cabe.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.serverUrl + '/api/comentarios/web/save',
        json, {headers : cabe})
            .map(res => res.json());
    }



}
