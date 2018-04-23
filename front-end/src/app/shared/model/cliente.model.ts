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


    constructor(cliente: any) {
      this.nome = cliente.nome;
      this.nome_mae = cliente.nome_mae;
      this.email = cliente.email;
      this.senha = cliente.senha;
      this.sexo = cliente.sexo;
      this.data_nascimento = cliente.data_nascimento;
      this.telefone = cliente.telefone;
      this.foto = cliente.foto;
      this.objetivo = cliente.objetivo;
      this.acesso = cliente.acesso;
    }

    setNome(nome: string) {
      this.nome = nome;
    }

  }
