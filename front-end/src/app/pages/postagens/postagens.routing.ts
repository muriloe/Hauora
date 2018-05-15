import { PostagensComponent } from './postagens.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PostagensComponent,
  },
];

export const routing = RouterModule.forChild(routes);
