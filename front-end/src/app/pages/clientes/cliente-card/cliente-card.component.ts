import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-cliente-card',
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent implements OnInit {
  @Input() cliente: Cliente;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  visualizarPerfil(clienteId) {
    const urlRedirect = 'pages/perfil?cliente=' + clienteId;
    this.router.navigate(['pages/perfil'], { queryParams: { cliente: clienteId } });
  }

}
