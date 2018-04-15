import { ConsultaService } from './consulta.service';
import { Cliente } from './../../shared/model/cliente.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {

  ngOnInit() {}

  clienteGenerico: Cliente;
  constructor(private consultaService: ConsultaService) {
    this.clienteGenerico = new Cliente('Selecione um paciênte', '', '', '', '', null, '', '', true);
  }

}
