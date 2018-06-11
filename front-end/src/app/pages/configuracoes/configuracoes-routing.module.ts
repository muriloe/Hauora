import { Routes, RouterModule } from '@angular/router';

import { ConfiguracoesComponent } from './configuracoes.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesComponent
  }
];

export const routing = RouterModule.forChild(routes);
