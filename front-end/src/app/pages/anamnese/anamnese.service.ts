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

    // Obtem a lista de cliente que estão na etapa de anamnese( aqueles que não fizeram a consulta )
    getClienteEmAnamnese () {
        return this.http.get( this.serverUrl + '/api/clientes/anamnese')
            .map((response: Response) => {
                const consultasPendentesResponse = response.json().obj;
                this.clientesEmAnamnese = [];

                for (const cliente of consultasPendentesResponse) {

                    // Se o cliente tiver uma url de foto, converte para uma url que gera uma versão menor
                    if (cliente.foto) {
                        cliente.foto = cliente.foto.replace('/uploads', '/uploads/min');
                    }

                    this.clientesEmAnamnese.push(new Cliente(cliente));
                }
                return this.clientesEmAnamnese;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


}
