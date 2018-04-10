import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../shared/model/cliente.model';


@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
})

export class ClientesComponent implements OnInit {
  listaClientesPacientes: Cliente[];

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.clientesService.getClientesPacientes()
            .subscribe(
                (listaClientesPacientes: Cliente[]) => {
                    this.listaClientesPacientes = listaClientesPacientes;
                },
            );
  }
}
