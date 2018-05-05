export class Composicao {
    public _id: string;
    public quantidade: string;
    public grupo: string;
    public cardapio: string;

    constructor(composicao: any) {
        this._id = composicao._id;
        this.quantidade = composicao.quantidade;
        this.grupo = composicao.grupo;
        this.cardapio = composicao.cardapio;
    }
}
