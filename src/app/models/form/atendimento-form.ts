export class AtendimentoForm {
  id: number;
  data: string;
  consumidores: number[];
  fornecedores: number[];
  relato: string;
  atendente: number;

  constructor(
    id: number,
    data: string,
    consumidores: number[],
    fornecedores: number[],
    relato: string,
    atendente: number
  ) {
    this.id = id;
    this.data = data;
    this.consumidores = consumidores;
    this.fornecedores = fornecedores;
    this.relato = relato;
    this.atendente = atendente;
  }
}
