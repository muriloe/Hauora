export class Cliente {
    public nome: string;
    public email: string;
    public senha: string;
    public telefone: string;
    public sexo: string;
    public data_nascimento: Date;
    public foto: string;
    public objetivo: string;
    public acesso: boolean;


    constructor(nome: string, email: string, senha: string,
                telefone: string, sexo: string, data_nascimento: Date,
                foto: string, objetivo: string, acesso: boolean) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.sexo = sexo;
      this.data_nascimento = data_nascimento;
      this.telefone = telefone;
      this.foto = foto;
      this.objetivo = objetivo;
      this.acesso = acesso;
    }
  }
