import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'anamnese',
    loadChildren: './anamnese/anamnese.module#AnamneseModule',
  },
  {
    path: 'clientes',
    loadChildren: './clientes/clientes.module#ClientesModule',
  },
  {
    path: 'consulta',
    loadChildren: './consulta/consulta.module#ConsultaModule',
  },
  {
    path: 'postagens',
    loadChildren: './postagens/postagens.module#PostagensModule',
  },
  {
    path: 'perfil',
    loadChildren: './perfil/perfil.module#PerfilModule',
  },
  {
    path: 'notificacao',
    loadChildren: './notificacoes/notificacao.module#NotificacaoModule',
  },
    {
    path: 'configuracoes',
    loadChildren: './configuracoes/configuracoes.module#ConfiguracoesModule',
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
