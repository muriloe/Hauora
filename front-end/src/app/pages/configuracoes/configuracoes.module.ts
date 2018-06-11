import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { ConfiguracoesComponent } from './configuracoes.component';
import { routing } from './configuracoes-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    ConfiguracoesComponent
  ]
})
export class ConfiguracoesModule {}