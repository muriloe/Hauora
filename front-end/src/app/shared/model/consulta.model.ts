export class Consulta {
    public _id: string;
    public data: Date;
    public peso: string;
    public pesoIdeal: string;
    public percentualGordura: string;
    public imc: string;
    public deficiencias: string;
    public excessos: string;
    public linkExames: string;
    public observacoes: string;
    public linkRelatorio: string;
    public nutricionista: string;

    constructor(consulta: any) {
        this._id = consulta._id;
        this.data = consulta.data;
        this.peso = consulta.peso;
        this.pesoIdeal = consulta.pesoIdeal;
        this. percentualGordura = consulta.percentualGordura;
        this.imc = consulta.imc;
        this.deficiencias = consulta.deficiencias;
        this.excessos = consulta.excessos;
        this.linkExames = consulta.linkExames;
        this.observacoes = consulta.observacoes;
        this.linkRelatorio = consulta.linkRelatorio;
        this.nutricionista = consulta.nutricionista;
    }
}
