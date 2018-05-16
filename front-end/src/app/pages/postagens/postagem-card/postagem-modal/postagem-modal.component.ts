import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-postagem-modal',
    templateUrl: './postagem-modal.component.html',
    styleUrls: ['./postagem-modal.component.scss'],
})

export class PostagemModalComponent implements OnInit {
    nome= 'Murilo Erhardt';
    data= '15/03/2018 15:30';
    imagem= 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png';
    imagemPost= 'assets/images/examples/food.jpg';
    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit(): void {}

}
