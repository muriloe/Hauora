import { Component, Input, OnInit } from '@angular/core';
import { Nutricionista } from '../../shared/model/nutricionista.model';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { ConfiguracoesService } from './configuracoes.service';
import { Router } from '@angular/router';





@Component({
  selector: 'ngx-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent implements OnInit{
    
    senhaAtual: String;
    novaSenha: String;
    confirmaSenha: String;
    validadorSenhaAtual: Boolean = false;
    validadorNovaSenha: Boolean = false;
    validadorConfirmaSenha: Boolean = false;
    
    nutricionista: Nutricionista;
    
    constructor(private configuracoesService: ConfiguracoesService, 
                private router: Router,    
                private service: NbTokenService) {
        service.get().subscribe((token: NbAuthJWTToken) => {
                    this.nutricionista = token.getPayload();
          });
    }
  
      ngOnInit(): void {
          
      }
  
  alterarSenha(){
      if(this.confirmaSenha !== this.novaSenha){
          alert('Senhas não conferem');
          this.validadorNovaSenha = true;
          this.validadorConfirmaSenha = true;
      }
      if(!this.senhaAtual){
          alert('Preencher todos os campos');
          this.validadorSenhaAtual = true;
      }
      if(!this.novaSenha){
          alert('Preencher todos os campos');
          this.validadorNovaSenha = true;
      }
      if(!this.confirmaSenha){
          alert('Preencher todos os campos');
          this.validadorConfirmaSenha = true;
      }
      this.configuracoesService.atualizarSenha(this.nutricionista._id, this.confirmaSenha).subscribe(
          (results: string[]) => {
            console.log("deu boa");
            alert("Senha modificada com sucesso");
            this.router.navigate(['auth/logout']);

          },
        );
  }
}