import { Cliente } from './../../shared/model/cliente.model';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent {
  clienteGenerico: Cliente;
  constructor() {
    this.clienteGenerico = new Cliente('Selecione um paciênte', '', '', '', '', null, '', '', true);
  }
}
