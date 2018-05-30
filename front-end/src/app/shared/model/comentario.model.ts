import { Nutricionista } from './nutricionista.model';
import { Cliente } from './cliente.model';
export class Comentario {
    public _id: string;
    public data: Date;
    public texto: string;
    public link_arquivo: string;
    public cliente: Cliente;
    public postagem_id: string;
    public consulta_id: string
    public nutricionista: Nutricionista;

    constructor(duvida: any) {
        this._id = duvida._id;
        this.data = duvida.data;
        this.texto = duvida.texto;
        this.link_arquivo = duvida.link_arquivo;
        this.cliente = duvida.cliente;
        this.postagem_id = duvida.postagem_id;
        this.consulta_id = duvida.consulta_id;
        this.nutricionista = duvida.nutricionista;
    }
}
