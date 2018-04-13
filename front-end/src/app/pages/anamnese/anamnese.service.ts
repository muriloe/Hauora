import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';




@Injectable()
export class AnamneseService {

    constructor(private http: Http) {}

    private clientesEmAnamnese: Cliente[] = [];

    getClienteEmAnamnese () {
        return this.http.get('http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000/api/clientes/anamnese')
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

                    nCli.push(new Cliente(cli.nome, cli.email, '', cli.telefone,
                    cli.sexo, null, enderecoCompletoFoto, cli.objetivo, false));
                }
                this.clientesEmAnamnese = nCli;
                return nCli;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


}
