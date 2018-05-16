import { ConsultaService } from './consulta.service';
import { Cliente } from './../../shared/model/cliente.model';
import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'ngx-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {


  clienteGenerico: Cliente;
  selecionouPaciente: boolean = false;
  constructor(private consultaService: ConsultaService, private route: ActivatedRoute) {
    
  }
  
    ngOnInit() {
    this.route.params.subscribe((params: Params) => {
         const clienteId = this.route.snapshot.queryParams['cliente'];
         console.log(clienteId);
         this.usuarioSelecionado(clienteId)
     });
  }
  
  usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(id)
              .subscribe(
                  (results: Cliente) => {
                      this.clienteGenerico = results;
                      this.selecionouPaciente = true;
                  },
              );
    }

}
