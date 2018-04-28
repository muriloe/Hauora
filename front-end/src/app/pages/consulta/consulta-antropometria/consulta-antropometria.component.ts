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
    selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];
    listaDeClientesBusca: Cliente[];

    constructor(private consultaService: ConsultaService) { }

    ngOnInit() {
        this.selecionouPaciente = false;
    }

    buscarPacientes(nomePaciente) {
      this.consultaService.getClientes(nomePaciente)
              .subscribe(
                  (listaDeClientesBusca: Cliente[]) => {
                      this.listaDeClientesBusca = listaDeClientesBusca;
                  },
              );
    }

    usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(id)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                      this.selecionouPaciente = true;
                  },
              );
    }

    cancelaAnamnese() {
        this.selecionouPaciente = false;
    }

}
