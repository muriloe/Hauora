export class Cliente {
    public _id: string;
    public nome: string;
    public nome_mae: string;
    public email: string;
    public senha: string;
    public telefone: string;
    public sexo: string;
    public data_nascimento: Date;
    public foto: string;
    public objetivo: string;
    public acesso: boolean;


    constructor(nome: string, nome_mae: string, email: string, senha: string,
                telefone: string, sexo: string, data_nascimento: Date,
                foto: string, objetivo: string, acesso: boolean) {
      this.nome = nome;
      this.nome_mae = nome_mae;
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
