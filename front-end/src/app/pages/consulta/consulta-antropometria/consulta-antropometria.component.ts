import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { ConsultaService } from '../consulta.service';

@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {
    pacienteSelecionado: any;
    pacienteSelecionado2: any;
    selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];

    constructor(private consultaService: ConsultaService) { }

    ngOnInit() {
        this.selecionouPaciente = true;
    }

    search(event) {
      this.consultaService.getResultsAutoComplete(event.query)
              .subscribe(
                  (results: string[]) => {
                      this.results = results;
                  },
              );
    }

    usuarioSelecionado() {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(this.pacienteSelecionado)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                  },
              );
    }

}
