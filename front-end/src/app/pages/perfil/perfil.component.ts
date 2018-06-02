import { PerfilService } from './perfil.service';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../shared/model/cliente.model';
import { ConsultaService } from '../consulta/consulta.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'ngx-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
  })

export class PerfilComponent implements OnInit {

  listaDeClientesBusca: Cliente[];
    @Input() selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    title = 'Busca Perfil';
    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        const clienteId = this.route.snapshot.queryParams['cliente'];
        this.usuarioSelecionado(clienteId)
    });
    }

    constructor(private perfilService: PerfilService, private route: ActivatedRoute) {}


  buscarPacientes(nomePaciente) {
    this.perfilService.getClientes(nomePaciente)
            .subscribe(
                (listaDeClientesBusca: Cliente[]) => {
                    this.listaDeClientesBusca = listaDeClientesBusca;
                },
            );
  }

  usuarioSelecionado(id) {
    this.selecionouPaciente = false;
    this.perfilService.getCliente(id)
          .subscribe(
              (results: Cliente) => {
                  this.cliente = results;
                  this.selecionouPaciente = true;
                  this.title = this.cliente.nome;
              },
          );
}

}
