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
    // Variável utilizada para salvar a lista de cliente (pessoas que já fizeram anamense)
    private clientes: Cliente[] = [];
    // Variável utlizada para armazena o endereço do servidor
    private serverUrl = new ServerInfo().getServerName();

    // Obtem a lisa de clientes (pacientes que já fizeram a anamnese, pré-consulta)
    getClientesPacientes () {
        return this.http.get(this.serverUrl + '/api/clientes')
            .map((response: Response) => {
                const clinetesResponse = response.json().obj;
                this.clientes = [];

                for (const cliente of clinetesResponse) {

                    if (cliente.foto) {
                        // tslint:disable-next-line:max-line-length
                        cliente.foto = cliente.foto.replace('/uploads', '/uploads/min');
                    }

                    this.clientes.push(new Cliente(cliente));
                }
                return this.clientes;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

}
