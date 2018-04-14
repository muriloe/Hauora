import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsultaComponent } from './consulta.component';
import { routing } from './consulta.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    ConsultaComponent,
  ],
})
export class ConsultaModule {}
