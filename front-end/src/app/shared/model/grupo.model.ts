export class Grupo {
    public _id: string;
    public titulo: string;

    constructor(grupo: any) {
        this._id = grupo._id;
        this.titulo = grupo.titulo;
    }
}
