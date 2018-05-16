import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-anamnese-card',
  templateUrl: './anamnese-card.component.html',
  styleUrls: ['./anamnese-card.component.scss'],
})
export class AnamneseCardComponent implements OnInit {
  @Input() clienteAnamnese: Cliente;

  constructor(private router: Router) { }

  ngOnInit() {

  }
  
  iniciarConsulta(clienteId){
    console.log(clienteId);
    const urlRedirect = 'pages/consulta?cliente='+clienteId;
    this.router.navigate(['pages/consulta'], { queryParams: { cliente: clienteId } });
  }

}
