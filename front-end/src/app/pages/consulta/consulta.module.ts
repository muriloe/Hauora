import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { ConsultaComponent } from './consulta.component';
import { ConsultaAntropometriaComponent } from './consulta-antropometria/consulta-antropometria.component';
import { routing } from './consulta.routing';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    routing,
  ],
  declarations: [
    ConsultaComponent,
    ConsultaAntropometriaComponent,
  ],
})
export class ConsultaModule {}
