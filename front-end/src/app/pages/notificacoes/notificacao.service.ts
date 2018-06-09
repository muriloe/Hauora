import { Consulta } from './../../shared/model/consulta.model';
import { Cliente } from './../../shared/model/cliente.model';
import { Notificacao } from './../../shared/model/notificacao.model';
import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ServerInfo } from './../../shared/server';
import { Headers } from '@angular/http';

@Injectable()
export class NotificacaoService {

    constructor(private http: Http) {}

    private notificacoes: Notificacao [] = [];
    private serverUrl = new ServerInfo().getServerName();

    buscarConsultas(indice) {
        return this.http.get(this.serverUrl + '/api/notificacoes/' + indice)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    obterPostagem(idPostagem) {
        return this.http.get(this.serverUrl + '/api/postagens/' + idPostagem)
        .map((response: Response) => {
            return response.json().obj[0];
        })
        .catch((error: Response) => Observable.throw(error));
    }


}
