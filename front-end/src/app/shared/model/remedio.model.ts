export class Remedio {
    public _id: string;
    public nome: string;
    public descricao: string;
    public anamneseId: string;

    constructor(remedio: any) {
        this._id = remedio._id;
        this.nome = remedio.nome;
        this.descricao = remedio.descricao;
        this.anamneseId = remedio.anamnese;
    }
}
