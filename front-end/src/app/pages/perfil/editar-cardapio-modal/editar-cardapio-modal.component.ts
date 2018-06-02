import { PerfilService } from './../perfil.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-editar-cardapio-modal',
    templateUrl: './editar-cardapio-modal.component.html',
    styleUrls: ['./editar-cardapio-modal.component.scss'],
})
export class EditarCardapioModalComponent implements OnInit {


    constructor(private activeModal: NgbActiveModal, private perfilService: PerfilService) { }

    ngOnInit(): void {
    }

}
