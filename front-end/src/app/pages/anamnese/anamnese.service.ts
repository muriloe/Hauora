import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';
import { ServerInfo } from './../../shared/server';


@Injectable()
export class AnamneseService {

    constructor(private http: Http) {}

    // Variável utilizada para salvar lista de cliente em anamnese (Consultas pendentes)
    private clientesEmAnamnese: Cliente[] = [];
    // Variável utlizada para armazena o endereço do servidor
    private serverUrl = new ServerInfo().getServerName();

    getClienteEmAnamnese () {

        return this.http.get( this.serverUrl + '/api/clientes/anamnese')
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

                    nCli.push(new Cliente(cli));
                }
                this.clientesEmAnamnese = nCli;
                return nCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


}
