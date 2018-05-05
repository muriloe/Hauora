export class Alimento {
    public _id: string;
    public nome: string;
    public porcao: string;
    public grupo: string; // id do grupo

    constructor(alimento: any) {
        this._id = alimento._id;
        this.nome = alimento.nome;
        this.porcao = alimento.porcao;
        this.grupo = alimento.grupo;
    }
}
