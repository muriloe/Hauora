import { Cardapio } from './cardapio.model';

export class Composicao {
    public _id: string;
    public quantidade: string;
    public grupo: string;
    public cardapio: Cardapio;

    constructor(composicao: any) {
        this._id = composicao._id;
        this.quantidade = composicao.quantidade;
        this.grupo = composicao.grupo;
        this.cardapio = composicao.cardapio;
    }
}
