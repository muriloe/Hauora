import { Component, OnInit } from '@angular/core';
import { AnamneseService } from './anamnese.service';
import { Cliente } from '../../shared/model/cliente.model';

@Component({
  selector: 'ngx-anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.scss'],
})
export class AnamneseComponent implements OnInit {
  // Armazena a lista das consultas pendentes (anamneses)
  consultasPendentes: Cliente[];
  filtroHomem: boolean = true;
  filtroMulher: boolean = true;

  constructor(private anamneseService: AnamneseService) {}

  ngOnInit() {
    this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (consultasPendentes: Cliente[]) => {
                    this.consultasPendentes = consultasPendentes;
                },
            );
  }

  filtrarHomem() {
    if (this.filtroHomem === true && this.filtroMulher === false) {

    }else {
      this.filtroHomem = !this.filtroHomem;
      this.filtrarPorSexo();
    }

  }

  filtrarMulher() {
    if (this.filtroMulher === true && this.filtroHomem === false) {

    }else {
      this.filtroMulher = !this.filtroMulher;
      this.filtrarPorSexo();
    }

  }

  filtrarPorSexo() {
    if (this.filtroHomem === true && this.filtroMulher === true) {
      this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (consultasPendentes: Cliente[]) => {
                    this.consultasPendentes = consultasPendentes;
                },
            );
    }

    if ( this.filtroHomem === true && this.filtroMulher === false) {
      this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (consultasPendentes: Cliente[]) => {
                    this.consultasPendentes = consultasPendentes;
                    this.consultasPendentes = this.consultasPendentes.filter(
                      // tslint:disable-next-line:no-shadowed-variable
                      Cliente => Cliente.sexo === 'MASCULINO');
                },
            );
    }

    if ( this.filtroMulher === true && this.filtroHomem === false) {
      this.anamneseService.getClienteEmAnamnese()
            .subscribe(
                (consultasPendentes: Cliente[]) => {
                    this.consultasPendentes = consultasPendentes;
                    this.consultasPendentes = this.consultasPendentes.filter(
                      // tslint:disable-next-line:no-shadowed-variable
                      Cliente => Cliente.sexo === 'FEMININO');
                },
            );
    }
  }


}
