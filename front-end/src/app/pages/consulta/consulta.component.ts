import { ConsultaService } from './consulta.service';
import { Cliente } from './../../shared/model/cliente.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {
  text: string;
  results: string[];

  ngOnInit() {}

  clienteGenerico: Cliente;
  constructor(private consultaService: ConsultaService) {
    this.clienteGenerico = new Cliente('Selecione um paciênte', '', '', '', '', null, '', '', true);
  }



  search(event) {
    this.consultaService.getResults(event.query)
            .subscribe(
                (results: string[]) => {
                    this.results = results;
                },
            );
  }
}
