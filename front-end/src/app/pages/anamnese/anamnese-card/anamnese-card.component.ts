import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';

@Component({
  selector: 'ngx-anamnese-card',
  templateUrl: './anamnese-card.component.html',
  styleUrls: ['./anamnese-card.component.scss'],
})
export class AnamneseCardComponent implements OnInit {
  @Input() clienteAnamnese: Cliente;

  constructor() { }

  ngOnInit() {

  }

}
