import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { PostagensComponent } from './postagens.component';
import { routing } from './postagens.routing';
import { PostagemCardComponent } from './postagem-card/postagem-card.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ThemeModule,
  ],
  declarations: [
    PostagensComponent,
    PostagemCardComponent,
  ],
})
export class PostagensModule {}
