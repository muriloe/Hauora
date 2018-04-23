import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';
import { ServerInfo } from './../../shared/server';

@Injectable()
export class ConsultaService {

    constructor(private http: Http) {}

    private clientesAutoComplete: Cliente[] = [];

    private serverUrl = new ServerInfo().getServerName();

    getResultsAutoComplete (query: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.serverUrl + '/api/clientes/autocomplete/' + query)
            .map((response: Response) => {
                const cliAnm = response.json().obj;
                const nCli: Cliente[] = [];
                const rCli: Cliente[] = [];

                for (const cli of cliAnm) {


                    nCli.push(new Cliente(cli));
                    rCli.push(cli.nome);
                }
                this.clientesAutoComplete = nCli;
                return rCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getCliente (nomeCliente: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.serverUrl + '/api/clientes/autocomplete/' + nomeCliente)
            .map((response: Response) => {
                const cliAnm = response.json().obj;
                const nCli: Cliente[] = [];

                for (const cli of cliAnm) {
                    let enderecoCompletoFoto;

                    if (cli.foto) {
                        // tslint:disable-next-line:max-line-length
                        const fotoCliente = cli.foto.replace('/uploads', '/uploads/min');
                        enderecoCompletoFoto = fotoCliente;
                    }
                    const cliTemp = new Cliente(cli);
                    cliTemp._id = cli._id;
                    nCli.push(cliTemp);
                }
                return nCli[0];
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

}
