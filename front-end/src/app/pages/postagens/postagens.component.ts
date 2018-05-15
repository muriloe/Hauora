import {OnInit, Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'ngx-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss'],
})

export class PostagensComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      // TESTE DE RECEBER PARAMETROS NA URL
      this.route.params.subscribe((params: Params) => {
          const param1 = this.route.snapshot.queryParams['param'];
          // console.log(param1);
        });
    }
}
