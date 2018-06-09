import { Consulta } from './../../../../shared/model/consulta.model';
import { Cliente } from './../../../../shared/model/cliente.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaService } from '../../consulta.service';
import { Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { VisualizarCardapioModalComponent } from '../../../perfil/visualizar-consulta-modal/visualizar-consulta-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngx-historico-consulta-card',
  templateUrl: './historico-consulta-card.component.html',
  styleUrls: ['./historico-consulta-card.component.scss'],
})
export class HistoricoConsultaCardComponent implements OnInit {

    @Input() consulta: Consulta;
    cliente: Cliente;


  constructor(private modalService: NgbModal, private consultaService: ConsultaService,  private router: Router) {

  }
  ngOnInit() {
    this.buscarUsuario(this.consulta.cliente);
  }

  buscarUsuario(id) {
    this.consultaService.getCliente(id)
          .subscribe(
              (results: Cliente) => {
                  this.cliente = results;
              },
          );
    }

    verConsulta(consulta) {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(VisualizarCardapioModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.consulta = consulta;
    }

    verCliente(clienteId) {
      const urlRedirect = 'pages/perfil?cliente=' + clienteId;
      this.router.navigate(['pages/perfil'], { queryParams: { cliente: clienteId } });
    }



}
