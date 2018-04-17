import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';

@Injectable()
export class ConsultaService {

    constructor(private http: Http) {}

    private clientesAutoComplete: Cliente[] = [];

    getResultsAutoComplete (query: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get('http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000/api/clientes/autocomplete/' + query)
            .map((response: Response) => {
                const cliAnm = response.json().obj;
                const nCli: Cliente[] = [];
                const rCli: Cliente[] = [];

                for (const cli of cliAnm) {


                    nCli.push(new Cliente(cli.nome, cli.nome_mae, cli.email, '', cli.telefone,
                    cli.sexo, null, 'erro 002a5', cli.objetivo, false));
                    rCli.push(cli.nome);
                }
                this.clientesAutoComplete = nCli;
                return rCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getCliente (nomeCliente: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get('http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000/api/clientes/autocomplete/' + nomeCliente)
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
                    const cliTemp = new Cliente(cli.nome, cli.nome_mae, cli.email, '', cli.telefone,
                    cli.sexo, null, enderecoCompletoFoto, cli.objetivo, false);
                    cliTemp._id = cli._id;
                    nCli.push(cliTemp);
                }
                return nCli[0];
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

}
