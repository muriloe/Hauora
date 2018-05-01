export class Consumo {
    public _id: string;
    public texto: string;
    public data: Date;
    public sentimento: string;
    public observacao: string;
    public tipo: string;
    public anamneseId: string;

    constructor(consumo: any) {
        this._id = consumo._id;
        this.texto = consumo.texto;
        this.data = consumo.data;
        this.sentimento = consumo.sentimento;
        this.observacao = consumo.observacao;
        this.tipo = consumo.tipo;
        this.anamneseId = consumo.anamnese;
    }
}
