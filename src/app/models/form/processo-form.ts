export class ProcessoForm {
  id: number;
  tipo: string;
  autos: string;
  consumidores: number[];
  representantes: number[];
  fornecedores: number[];
  data: string;
  relato: string;
  situacao: string;

  constructor(
    id: number,
    tipo: string,
    autos: string,
    consumidores: number[],
    representantes: number[],
    fornecedores: number[],
    data: string,
    relato: string,
    situacao: string
  ) {
    this.id = id;
    this.tipo = tipo;
    this.autos = autos;
    this.consumidores = consumidores;
    this.representantes = representantes;
    this.fornecedores = fornecedores;
    this.data = data;
    this.relato = relato;
    this.situacao = situacao;
  }
}
