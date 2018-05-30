import { Composicao } from './../../shared/model/composicao.model';
import { Cardapio } from './../../shared/model/cardapio.model';
import { Cliente } from './../../shared/model/cliente.model';
import { Consulta } from './../../shared/model/consulta.model';
import { Remedio } from './../../shared/model/remedio.model';
import { Doenca } from './../../shared/model/doenca.model';
import { Anamnese } from './../../shared/model/anamnese.model';
import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ServerInfo } from './../../shared/server';
import { Headers } from '@angular/http';

@Injectable()
export class ConsultaService {

    constructor(private http: Http) {}

    private clientesAutoComplete: Cliente[] = [];

    private serverUrl = new ServerInfo().getServerName();

    getClientes (query: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.serverUrl + '/api/clientes/autocomplete/' + query)
            .map((response: Response) => {
                const cliAnm = response.json().obj;
                const nCli: Cliente[] = [];

                for (const cli of cliAnm) {
                    cli.foto = cli.foto.replace('/uploads', '/uploads/min');
                    nCli.push(new Cliente(cli));
                }
                this.clientesAutoComplete = nCli;
                return nCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    // Obtem o cliente pelo id
    getCliente (id: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.serverUrl + '/api/cliente/' + id)
            .map((response: Response) => {
                const cliAnm = response.json().obj;
                const nCli: Cliente[] = [];

                for (const cli of cliAnm) {

                    if (cli.foto) {
                        // tslint:disable-next-line:max-line-length
                        cli.foto = cli.foto.replace('/uploads', '/uploads/min');
                        nCli.push(new Cliente(cli));
                    }
                    const cliTemp = new Cliente(cli);
                    cliTemp._id = cli._id;
                    nCli.push(cliTemp);
                }
                return nCli[0];
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getAnamnese(userId: string) {
        return this.http.get(this.serverUrl + '/api/anamnese/' + userId)
            .map((response: Response) => {
                const anamneseResponse = response.json().anamnese;
                const anamnese: Anamnese = new Anamnese('');
                anamnese._id = anamneseResponse[0]._id;
                anamnese.consumo = anamneseResponse[0].consumo;
                anamnese.doenca = anamneseResponse[0].doenca;
                anamnese.remedio = anamneseResponse[0].remedio;
                anamnese.data = anamneseResponse[0].data;

                return anamnese;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getRemedios(anamneseId: string) {
        return this.http.get(this.serverUrl + '/api/anamnese/remedios/' + anamneseId)
            .map((response: Response) => {
                const remedioResponse = response.json().remedio;
                const remedios = remedioResponse;
                return remedios;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getDoencas(anamneseId: string) {
        return this.http.get(this.serverUrl + '/api/anamnese/doencas/' + anamneseId)
            .map((response: Response) => {
                const doencaResponse = response.json().doenca;
                const doenca = doencaResponse;
                return doenca;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getConsumos(anamneseId: string) {
        return this.http.get(this.serverUrl + '/api/anamnese/consumos/' + anamneseId)
            .map((response: Response) => {
                const consumoResponse = response.json().consumo;
                const consumo = consumoResponse;
                return consumo;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getGrupos() {
        return this.http.get(this.serverUrl + '/api/grupos')
        .map((response: Response) => {
            return response.json().grupos;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getAlimentos(grupoId: string) {
        return this.http.get(this.serverUrl + '/api/alimentos/' + grupoId)
        .map((response: Response) => {
            return response.json().alimentos;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }

    postConsulta(   consultaCompleta: Consulta,
                    cafeDaManha: Composicao[],
                    lancheDaManha: Composicao[],
                    almoco: Composicao[],
                    lanche: Composicao[],
                    janta: Composicao[]) {

    let json = JSON.stringify({   consulta: consultaCompleta,
                                    composicoesCafeDaManha: cafeDaManha,
                                    composicoesLancheDaManha: lancheDaManha,
                                    composicoesAlmoco: almoco,
                                    composicoesLanche: lanche,
                                    composicoesJanta: janta});
        json = 'json=' + json;
        const cabe = new Headers();
        cabe.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.serverUrl + '/api/consulta',
        json, {headers : cabe})
                .map(res => res.json());

    }

}
