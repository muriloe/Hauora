import { Composicao } from './../../../shared/model/composicao.model';
import { PerfilService } from './../perfil.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from '../../../shared/model/grupo.model';
import { Cardapio } from '../../../shared/model/cardapio.model';
import { Consulta } from '../../../shared/model/consulta.model';

@Component({
    selector: 'ngx-visualizar-consulta-modal',
    templateUrl: './visualizar-consulta-modal.component.html',
})
export class VisualizarCardapioModalComponent implements OnInit {

    consulta: Consulta;
    peso: string;
    altura: string;
    gordura: string;
    imc: string;
    pesoIdeal: string;

    constructor(private activeModal: NgbActiveModal, private perfilService: PerfilService) { }

    ngOnInit(): void {
        this.peso = this.consulta.peso + ' kg';
        this.altura = this.consulta.altura + ' m';
        this.gordura = this.consulta.percentualGordura + '%';
        this.imc = this.consulta.imc + ' kg/m2';
        this.pesoIdeal = this.consulta.pesoIdeal + ' kg';
    }

  
}
