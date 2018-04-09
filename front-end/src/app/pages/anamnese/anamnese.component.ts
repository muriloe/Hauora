import { Component, OnInit } from '@angular/core';
import { AnamneseService } from './anamnese.service';
import { Cliente } from '../../shared/model/cliente.model';

@Component({
  selector: 'ngx-anamnese',
  templateUrl: './anamnese.component.html',
})
export class AnamneseComponent implements OnInit {
  listaClientesEmAnaminese: Cliente[];

  constructor(private anamneseService: AnamneseService) {}

  ngOnInit() {
    this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (listaClientesEmAnaminese: Cliente[]) => {
                    this.listaClientesEmAnaminese = listaClientesEmAnaminese;
                },
            );
  }
}
