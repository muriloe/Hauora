import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { routing } from './notificacao.routing';
import { NotificacaoComponent } from './notificacao.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    NotificacaoComponent,
  ],
})
export class NotificacaoModule {}
