import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
];

export const routing = RouterModule.forChild(routes);
