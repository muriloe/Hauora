import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
    nome: String;
    email: String;
    
    fotoBase;
    reqFoto;
    @ViewChild('reqFoto')
    inputFoto: any;
    
    
    nutricionista: Nutricionista;
    
    constructor(private configuracoesService: ConfiguracoesService, 
                private router: Router,    
                private service: NbTokenService) {
        service.get().subscribe((token: NbAuthJWTToken) => {
                    this.nutricionista = token.getPayload();
          });
    }
  
      ngOnInit(): void {
          this.nome = this.nutricionista.nome;
          this.email = this.nutricionista.email;
          
      }
      
  onInserFoto(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
            const exema = ({
                filetype: file.type,
                value: reader.result.split(',')[1],
            });
            console.log(exema);
            if (exema.filetype !== 'image/png') {
                alert('Só é aceito imagem PNG');
                this.inputFoto.nativeElement.value = '';

            }else {
                this.fotoBase = exema;
            }
          };
        }
    }
  
  alterarSenha(){
    if(!this.validarCamposSenha()){
          this.configuracoesService.atualizarSenha(this.nutricionista._id, this.confirmaSenha).subscribe(
          (results: string[]) => {
            console.log("deu boa");
            alert("Senha modificada com sucesso");
            this.router.navigate(['auth/logout']);

          },
        );
    }

  }
  
  validarCamposSenha(){
      var hasErrors: Boolean = false;
      if(this.confirmaSenha !== this.novaSenha){
          alert('Senhas não conferem');
          this.validadorNovaSenha = true;
          this.validadorConfirmaSenha = true;
          hasErrors = true;
      }
      if(!this.senhaAtual){
          alert('Preencher todos os campos');
          this.validadorSenhaAtual = true;
          hasErrors = true;
      }
      if(!this.novaSenha){
          alert('Preencher todos os campos');
          this.validadorNovaSenha = true;
          hasErrors = true;
      }
      if(!this.confirmaSenha){
          alert('Preencher todos os campos');
          this.validadorConfirmaSenha = true;
          hasErrors = true;
      }
      if(this.confirmaSenha.length < 6){
          alert('Senha precisa ter no mínimo 6 e no máximo 20 cararcteres');
          hasErrors = true;
      }
      console.log(this.nutricionista);
      if(this.nutricionista.senha !== this.senhaAtual){
          alert('A senha atual não é a correta');
          hasErrors = true;
      }
      return hasErrors;
  }
  
  alterarInformacoes(){
    this.configuracoesService.atualizarInfo(this.nutricionista._id, this.nome, this.email, this.fotoBase).subscribe(
          (results: string[]) => {
            console.log("deu boa");
            alert("Dados atualizados, será necessário logar novamente para atualizarmos seu token de navegação");
            this.router.navigate(['auth/logout']);
          },
    );  
  }
}