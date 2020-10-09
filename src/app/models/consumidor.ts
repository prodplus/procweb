import { Endereco } from './auxiliares/endereco';

export class Consumidor {
  id: number;
  tipo: string;
  denominacao: string;
  cadastro: string;
  email: string;
  endereco: Endereco;
  fones: string[];

  constructor(
    id: number,
    tipo: string,
    denominacao: string,
    cadastro: string,
    email: string,
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    municipio: string,
    uf: string,
    fones: string[]
  ) {
    this.id = id;
    this.tipo = tipo;
    this.denominacao = denominacao;
    this.cadastro = cadastro;
    this.email = email;
    this.endereco.cep = cep;
    this.endereco.logradouro = logradouro;
    this.endereco.numero = numero;
    this.endereco.complemento = complemento;
    this.endereco.bairro = bairro;
    this.endereco.municipio = municipio;
    this.endereco.uf = uf;
    this.fones = fones;
  }
}
