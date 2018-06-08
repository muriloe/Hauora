import { Component, OnInit, Input} from '@angular/core';
import { Notificacao } from './../../shared/model/notificacao.model';
import { NotificacaoService } from './notificacao.service';
import { NbMenuItem } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VisualizarCardapioModalComponent } from '../perfil/visualizar-consulta-modal/visualizar-consulta-modal.component';
import { PostagemModalComponent } from '../postagens/postagem-card/postagem-modal/postagem-modal.component';



@Component({
    selector: 'ngx-notificacao',
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.scss'],
  })

export class NotificacaoComponent implements OnInit{
    notificacoes: Notificacao[] = [];
    indice = 0;
    
    constructor(private router: Router, private modalService: NgbModal, private notificacaoService: NotificacaoService) {}
    
     ngOnInit() {
         this.getListaNotificacoes();
     }
     
     getListaNotificacoes() {
        this.notificacaoService.buscarConsultas(this.indice)
        .subscribe(
            (notificacoes: Notificacao[]) => {
                this.notificacoes = notificacoes;
            },
        );
    }
    
    
    verDetalhe(notificacao) {
        if(!notificacao.consulta[0] && !notificacao.postagem[0]) {
            console.log('notifacaca de trpca de cardapio');
            const urlRedirect = 'pages/perfil?cliente=' + notificacao.cliente;
            this.router.navigate(['pages/perfil'], { queryParams: { cliente: notificacao.cliente } });
        }
        if(notificacao.consulta[0]) {
            console.log('notifacaca consulta');
            const activeModal = this.modalService.open(VisualizarCardapioModalComponent, { size: 'lg', container: 'nb-layout' });
            activeModal.componentInstance.modalHeader = 'Large Modal';
            activeModal.componentInstance.consulta = notificacao.consulta[0];
        }
        if(notificacao.postagem[0]) {
            
             this.notificacaoService.obterPostagem(notificacao.postagem[0]._id)
            .subscribe(
                (notificacoes: Notificacao) => {
                    var not = notificacoes;
                    const activeModal = this.modalService.open(PostagemModalComponent, { size: 'lg', container: 'nb-layout' });
                    activeModal.componentInstance.modalHeader = 'Large Modal';
                    activeModal.componentInstance.postagem = not;
                },
            );

        }
    }
     
}