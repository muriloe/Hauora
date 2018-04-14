import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';

@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {

    @Input() cliente: Cliente;
    teste: Cliente = new Cliente('dasdas', 'sadasd@', '123', 'sadas', 'macho', null, '', 'sei la', false);

    constructor() { }

    ngOnInit() {
     this.cliente.nome = 'Selecione um paciente';


    }

}
