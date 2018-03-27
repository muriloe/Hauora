

import { Routes, RouterModule } from '@angular/router';
import { AnamneseComponent } from './anamnese.component';

const routes: Routes = [
  {
    path: '',
    component: AnamneseComponent,
  },
];

export const routing = RouterModule.forChild(routes);
