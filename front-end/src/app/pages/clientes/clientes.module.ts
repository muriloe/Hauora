import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { ClientesComponent } from './clientes.component';
import { routing } from './clientes.routing';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    ClientesComponent,
    ClienteCardComponent,
  ],
})
export class ClientesModule {}
