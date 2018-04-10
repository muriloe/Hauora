import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';

@Component({
  selector: 'ngx-cliente-card',
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent implements OnInit {
  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit() {

  }

}
