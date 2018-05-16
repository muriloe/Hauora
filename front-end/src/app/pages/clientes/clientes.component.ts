import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../shared/model/cliente.model';


@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
})

export class ClientesComponent implements OnInit {
  listaClientes: Cliente[];
  filtroHomem: boolean = true;
  filtroMulher: boolean = true;

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.clientesService.getClientesPacientes()
            .subscribe(
                (listaClientes: Cliente[]) => {
                    this.listaClientes = listaClientes;
                },
            );
  }

  filtrarHomem() {
    if (this.filtroHomem === true && this.filtroMulher === false) {

    }else {
      this.filtroHomem = !this.filtroHomem;
      this.filtrarPorSexo();
    }

  }

  filtrarMulher() {
    if (this.filtroMulher === true && this.filtroHomem === false) {

    }else {
      this.filtroMulher = !this.filtroMulher;
      this.filtrarPorSexo();
    }

  }

  filtrarPorSexo() {
    if (this.filtroHomem === true && this.filtroMulher === true) {
      this.clientesService.getClientesPacientes()
            .subscribe(
                (listaClientes: Cliente[]) => {
                    this.listaClientes = listaClientes;
                },
            );
    }

    if ( this.filtroHomem === true && this.filtroMulher === false) {
      this.clientesService.getClientesPacientes()
            .subscribe(
                (listaClientes: Cliente[]) => {
                    this.listaClientes = listaClientes;
                    this.listaClientes = this.listaClientes.filter(
                      // tslint:disable-next-line:no-shadowed-variable
                      Cliente => Cliente.sexo === 'MASCULINO');
                },
            );
    }

    if ( this.filtroMulher === true && this.filtroHomem === false) {
      this.clientesService.getClientesPacientes()
            .subscribe(
                (listaClientes: Cliente[]) => {
                    this.listaClientes = listaClientes;
                    this.listaClientes = this.listaClientes.filter(
                      // tslint:disable-next-line:no-shadowed-variable
                      Cliente => Cliente.sexo === 'FEMININO');
                },
            );
    }
  }
}
