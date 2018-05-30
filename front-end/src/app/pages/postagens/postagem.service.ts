import { Postagem } from './../../shared/model/postagem.model';
import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ServerInfo } from './../../shared/server';
import { Headers } from '@angular/http';
@Injectable()
export class PostagemService {
    constructor(private http: Http) {}
    // Variável utlizada para armazena o endereço do servidor
    private serverUrl = new ServerInfo().getServerName();
    private postagens: Postagem[] = [];

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

}
