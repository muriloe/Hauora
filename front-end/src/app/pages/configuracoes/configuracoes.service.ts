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
export class ConfiguracoesService {
    private serverUrl = new ServerInfo().getServerName();
    
    
    constructor(private http: Http) {}
    
    atualizarSenha(idNutricionista, novaSenha){
        let json = JSON.stringify({_id: idNutricionista, senha: novaSenha});
            json = 'json=' + json;
            const cabe = new Headers();
            cabe.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(this.serverUrl + '/api/ataulizar/nutricionista',
            json, {headers : cabe})
                .map(res => res.json());
    }
    
}