import { Component, OnInit } from '@angular/core';
import { AnamneseService } from './anamnese.service';
import { Cliente } from '../../shared/model/cliente.model';

@Component({
  selector: 'ngx-anamnese',
  templateUrl: './anamnese.component.html',
})
export class AnamneseComponent implements OnInit {
  // Armazena a lista das consultas pendentes (anamneses)
  consultasPendentes: Cliente[];

  constructor(private anamneseService: AnamneseService) {}

  ngOnInit() {
    this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (consultasPendentes: Cliente[]) => {
                    this.consultasPendentes = consultasPendentes;
                },
            );
  }
}
