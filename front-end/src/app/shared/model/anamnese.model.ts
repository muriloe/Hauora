export class Anamnese {
    public _id: string;
    public data: string;
    public cliente: string;
    public remedio: string[];
    public doenca: string[];
    public consumo: string[];

    constructor(anamnese: any) {
        this._id = anamnese._id;
        this.data = anamnese.data;
        this.cliente = anamnese.cliente;
        this.remedio = anamnese.remedio;
        this.doenca = anamnese.doenca;
        this.consumo = anamnese.consumo;
    }
}
