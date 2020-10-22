import { Movimento } from '../auxiliares/movimento';
import { Consumidor } from '../consumidor';
import { Fornecedor } from '../fornecedor';

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

export function transformaConsumidores(consumidores: Consumidor[]): number[] {
  const retorno: number[] = [];
  for (let c of consumidores) {
    retorno.push(c.id);
  }
  return retorno;
}

export function transformaFornecedores(fornecedores: Fornecedor[]): number[] {
  const retorno: number[] = [];
  for (let f of fornecedores) {
    retorno.push(f.id);
  }
  return retorno;
}
