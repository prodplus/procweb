import { Movimento } from '../auxiliares/movimento';

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
  movimentacao: Movimento[];

  constructor(
    id: number,
    tipo: string,
    autos: string,
    consumidores: number[],
    representantes: number[],
    fornecedores: number[],
    data: string,
    relato: string,
    situacao: string,
    movimentacao: Movimento[]
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
    this.movimentacao = movimentacao;
  }
}
