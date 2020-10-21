export class Movimento {
  data: string;
  de: string;
  para: string;
  averbacao: string;
  auxD: string;
  auxT: string;

  constructor(
    data: string,
    de: string,
    para: string,
    averbacao: string,
    auxD: string,
    auxT: string
  ) {
    this.data = data;
    this.de = de;
    this.para = para;
    this.averbacao = averbacao;
    this.auxD = auxD;
    this.auxT = auxT;
  }
}

export function ordenaMovimentos(movimentos: Movimento[]): Movimento[] {
  movimentos.sort((a, b) => {
    if (a.data > b.data) {
      return -1;
    } else if (a.data < b.data) {
      return 1;
    } else {
      return 0;
    }
  });
  return movimentos;
}
