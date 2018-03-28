import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { AnamneseComponent } from './anamnese.component';
import { routing } from './anamnese.routing';
import { AnamneseCardComponent } from './anamnese-card/anamnese-card.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    AnamneseComponent,
    AnamneseCardComponent,
  ],
})
export class AnamneseModule {}
