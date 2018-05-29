import { PostagemService } from './postagem.service';
import { Postagem } from './../../shared/model/postagem.model';
import {OnInit, Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'ngx-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss'],
})

export class PostagensComponent implements OnInit {
    constructor(private postagemService: PostagemService) {}
    listaPostagens: Postagem[];

    ngOnInit() {
        this.postagemService.getPostagens()
        .subscribe(
            (listaPostagens: Postagem[]) => {
                this.listaPostagens = listaPostagens;
            },
        );
    }
}
