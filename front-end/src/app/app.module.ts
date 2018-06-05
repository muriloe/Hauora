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
import { PostagemService } from './pages/postagens/postagem.service';
import { ServerInfo} from './shared/server';
import { HttpModule } from '@angular/http';
// tslint:disable-next-line:max-line-length
import { ConsultaAnamneseModalComponent } from './pages/consulta/consulta-antropometria/consulta-anamnese-modal/consulta-anamnese-modal.component';
import { ConsumoCardComponent } from './pages/consulta/consulta-antropometria/consulta-anamnese-modal/consumo-card/consumo-card';
// tslint:disable-next-line:max-line-length
import { RemedioDoencaCardComponent } from './pages/consulta/consulta-antropometria/consulta-anamnese-modal/remedioDoenca-card/remedioDoenca-card';
import { ConsultaGruposModalComponent } from './pages/consulta/consulta-antropometria/consulta-grupos-modal/consulta-grupo-modal.component';
// tslint:disable-next-line:max-line-length
import { AlimentosCardComponent } from './pages/consulta/consulta-antropometria/consulta-grupos-modal/alimentos-card-modal.component';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { PostagemModalComponent } from './pages/postagens/postagem-card/postagem-modal/postagem-modal.component';
// tslint:disable-next-line:max-line-length
import { ComentarioCardComponent } from './pages/postagens/postagem-card/postagem-modal/comentario-card/comentario-card.component';
import { PerfilService } from './pages/perfil/perfil.service';
import { EditarCardapioModalComponent } from './pages/perfil/editar-cardapio-modal/editar-cardapio-modal.component';
// tslint:disable-next-line:max-line-length
import { VisualizarCardapioModalComponent } from './pages/perfil/visualizar-consulta-modal/visualizar-consulta-modal.component';
import { ComentarioConsultaCardComponent } from './pages/perfil/visualizar-consulta-modal/comentario-consulta-card/comentario-consulta-card.component';
// tslint:disable-next-line:max-line-length
import { PerfilPostagemModalComponent } from './pages/perfil/perfil-postagem-card/perfil-postagem-modal/perfil-postagem-modal.component';


@NgModule({
  declarations: [AppComponent,
                ConsultaAnamneseModalComponent,
                ConsumoCardComponent,
                RemedioDoencaCardComponent,
                ConsultaGruposModalComponent,
                AlimentosCardComponent,
                PostagemModalComponent,
                ComentarioCardComponent,
                EditarCardapioModalComponent,
                VisualizarCardapioModalComponent,
                ComentarioConsultaCardComponent,
                PerfilPostagemModalComponent],
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
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    [ AnamneseService ],
    [ ClientesService ],
    [ ConsultaService ],
    [ PostagemService ],
    [ PerfilService ],
    [ ServerInfo ],
    [ AuthGuard ],

  ],
  entryComponents: [ConsultaAnamneseModalComponent,
                    ConsumoCardComponent,
                    RemedioDoencaCardComponent,
                    ConsultaGruposModalComponent,
                    AlimentosCardComponent,
                    PostagemModalComponent,
                    EditarCardapioModalComponent,
                    VisualizarCardapioModalComponent,
                    ComentarioConsultaCardComponent,
                    PerfilPostagemModalComponent],
})
export class AppModule {
}
