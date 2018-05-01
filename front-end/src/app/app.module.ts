/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AnamneseService } from './pages/anamnese/anamnese.service';
import { ClientesService } from './pages/clientes/clientes.service';
import { ConsultaService} from './pages/consulta/consulta.service';
import { ServerInfo} from './shared/server';
import { HttpModule } from '@angular/http';
// tslint:disable-next-line:max-line-length
import { ConsultaAnamneseViewComponent } from './pages/consulta/consulta-antropometria/consulta-anamnese-view/consulta-anamnese-view.component';

@NgModule({
  declarations: [AppComponent, ConsultaAnamneseViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    [ AnamneseService ],
    [ ClientesService ],
    [ ConsultaService ],
    [ ServerInfo ],

  ],
  entryComponents: [ConsultaAnamneseViewComponent],
})
export class AppModule {
}
