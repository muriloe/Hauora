import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { routing } from './perfil.routing';
import { PerfilComponent } from './perfil.component';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    PerfilComponent,
  ],
})
export class PerfilModule {}
