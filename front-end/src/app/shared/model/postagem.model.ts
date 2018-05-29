import { Exercicio } from './exercicio.model';
import { Consumo } from './consumo.model';
import { Duvida } from './duvida.model';
import { Cliente } from './cliente.model';
export class Postagem {
    public _id: string;
    public linkFoto: string;
    public cliente: Cliente;
    public consumo: Consumo;
    public exercicio: Exercicio;
    public duvida: Duvida;
    public totalComentarios: string;
    public data: Date;
    public visualizado: boolean;

    constructor(postagem: any) {
        this._id = postagem._id;
        this.linkFoto = postagem.linkFoto;
        this.cliente = postagem.cliente;
        this.exercicio = postagem.exercicio;
        this.duvida = postagem.duvida;
        this.consumo = postagem.consumo;
        this.totalComentarios = postagem.totalComentarios;
        this.data = postagem.data;
        this.visualizado = postagem.visualizado;
    }
}
