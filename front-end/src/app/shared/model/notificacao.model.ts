import { Consulta } from './consulta.model';
import { Postagem } from './postagem.model';
import { Cliente } from './cliente.model';

export class Notificacao {
    public _id: string;
    public cliente: string;
    public postagem: Postagem;
    public consulta: Consulta;
    public data: Date;
    public texto: String;


    constructor(notificacao: any) {
        this._id = notificacao._id;
        this.cliente = notificacao.cliente;
        this.postagem = notificacao.postagem;
        this.consulta = notificacao.consulta;
        this.data = notificacao.data;
        this.texto = notificacao.texto;

    }
}
