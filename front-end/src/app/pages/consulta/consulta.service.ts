import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Cliente } from '../../shared/model/cliente.model';

@Injectable()
export class ConsultaService {

    constructor(private http: Http) {}

    private clientesPacientes: Cliente[] = [];

    getResults (query: string) {


    }

}
