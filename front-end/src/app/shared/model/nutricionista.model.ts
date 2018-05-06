export class Nutricionista {
    public _id: string;
    public nome: string;
    public email: string;
    public senha: string;
    public telefone: string;
    public sexo: string;
    public data_nascimento: Date;
    public foto: string;


    constructor(cliente: any) {
      this._id = cliente._id;
      this.nome = cliente.nome;
      this.email = cliente.email;
      this.senha = cliente.senha;
      this.sexo = cliente.sexo;
      this.data_nascimento = cliente.data_nascimento;
      this.telefone = cliente.telefone;
      this.foto = cliente.foto;
    }

    setNome(nome: string) {
      this.nome = nome;
    }

  }
