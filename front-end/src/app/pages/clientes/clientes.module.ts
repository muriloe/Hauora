import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesComponent } from './clientes.component';
import { routing } from './clientes.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    ClientesComponent,
  ],
})
export class ClientesModule {}
