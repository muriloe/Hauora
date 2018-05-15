import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostagensComponent } from './postagens.component';
import { routing } from './postagens.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
  ],
  declarations: [
    PostagensComponent,
  ],
})
export class PostagensModule {}
