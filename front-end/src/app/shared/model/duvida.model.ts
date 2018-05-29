export class Duvida {
    public _id: string;
    public data: Date;
    public texto: string;

    constructor(duvida: any) {
        this._id = duvida._id;
        this.data = duvida.data;
        this.texto = duvida.texto;
    }
}



