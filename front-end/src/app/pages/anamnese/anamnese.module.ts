import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnamneseComponent } from './anamnese.component';
import { routing } from './anamnese.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    AnamneseComponent,
  ],
})
export class AnamneseModule {}
