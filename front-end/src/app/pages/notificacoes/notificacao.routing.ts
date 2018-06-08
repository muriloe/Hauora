import { Routes, RouterModule } from '@angular/router';

import { NotificacaoComponent } from './notificacao.component';

const routes: Routes = [
  {
    path: '',
    component: NotificacaoComponent,
  },
];

export const routing = RouterModule.forChild(routes);
