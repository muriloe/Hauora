import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';
import { ServerInfo } from './../../shared/server';

@Injectable()
export class ClientesService {

    constructor(private http: Http) {}
    // Variável utilizada para salva a lista de cliente
    private clientesPacientes: Cliente[] = [];
    // Variável utlizada para armazena o endereço do servidor
    private serverUrl = new ServerInfo().getServerName();

    getClientesPacientes () {
        return this.http.get(this.serverUrl + '/api/clientes')
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
                this.clientesPacientes = nCli;
                return nCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

}
