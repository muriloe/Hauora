export class Doenca {
    public _id: string;
    public nome: string;
    public descricao: string;
    public anamneseId: string;

    constructor(doenca: any) {
        this._id = doenca._id;
        this.nome = doenca.nome;
        this.descricao = doenca.descricao;
        this.anamneseId = doenca.anamnese;
    }
}
