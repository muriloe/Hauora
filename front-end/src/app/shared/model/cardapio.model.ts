export class Cardapio {
    public _id: string;
    public tipo: string;
    public usuario_id: string;
    public data: string;

    constructor(cardapio: any) {
        this._id = cardapio._id;
        this.tipo = cardapio.tipo;
        this.usuario_id = cardapio.usuario_id;
        this.data = cardapio.data;
    }
}
