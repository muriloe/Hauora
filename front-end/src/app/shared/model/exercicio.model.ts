export class Exercicio {
    public _id: string;
    public data: Date;
    public texto: string;

    constructor(exercicio: any) {
        this._id = exercicio._id;
        this.data = exercicio.data;
        this.texto = exercicio.texto;
    }
}
