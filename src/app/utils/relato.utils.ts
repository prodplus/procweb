import * as jsPDF from 'jspdf';
import { Processo } from '../models/processo';
import { getMesExtenso } from './date.utils';

export function geraRelato(processo: Processo) {
  const documento = new jsPDF('p', 'mm', 'a4');
  documento.setFont('Courier');
  documento.setFontStyle('bold');
  documento.setFontSize(20);

  documento.text('PROCON MUNICIPAL DE PATO BRANCO - PR', 30, 15);

  documento.setFont('Courier');
  documento.setFontStyle('bold');
  documento.setFontSize(10);
  documento.text('Fone: (46) 3902-1289 / 3902-1325', 70, 20);

  let init = 40;

  documento.setFont('Times');
  documento.setFontSize(12);
  const data = new Date(processo.data);
  documento.text(
    'Pato Branco, ' +
      data.getDate() +
      ' de ' +
      getMesExtenso(data.getMonth()) +
      ' de ' +
      data.getFullYear(),
    120,
    init
  );

  documento.setFont('Times');
  documento.setFontStyle('bold');
  documento.setFontSize(14);
  documento.text('Autos ' + processo.autos, 20, init);

  init += 6;

  documento.setFont('Times');
  documento.setFontStyle('normal');
  documento.setFontSize(12);

  let ic = 1;
  let rectConsInit = init;
  for (const c of processo.consumidores) {
    rectConsInit = init;
    init += 6;
    documento.setFontStyle('bold');
    documento.text('Consumidor ' + ic + ': ' + c.denominacao, 20, init - 1.5);
    init += 6;
    documento.setFontStyle('normal');
    documento.text(
      'Endereço: ' +
        c.endereco.logradouro +
        ', ' +
        c.endereco.numero +
        ', ' +
        c.endereco.complemento +
        ', bairro ' +
        c.endereco.bairro +
        ', CEP: ' +
        c.endereco.cep,
      20,
      init - 1.5
    );
    init += 6;
    const desc = c.tipo === 'FISICA' ? 'CPF: ' : 'CNPJ: ';
    let fones = '';
    for (const f of c.fones) {
      fones += f + ' ';
    }
    documento.text(desc + c.cadastro + ' / ' + fones, 20, init - 1.5);
    documento.rect(19, rectConsInit, 170, init - rectConsInit);
    ic++;
  }

  let rectRepInit = init;
  if (processo.representantes && processo.representantes.length > 0) {
    rectRepInit = init;
    init += 6;
    for (const r of processo.representantes) {
      documento.text('Representante: ' + r.denominacao, 20, init - 1.5);
    }
    documento.rect(19, rectRepInit, 170, init - rectRepInit);
  }

  let ifo = 1;
  let rectFornInit = init;
  for (const f of processo.fornecedores) {
    rectFornInit = init;
    init += 6;
    documento.setFontStyle('bold');
    documento.text('Fornecedor ' + ifo + ': ' + f.fantasia, 20, init - 1.5);
    documento.setFontStyle('normal');
    if (f.cnpj) {
      init += 6;
      documento.text('CNPJ: ' + f.cnpj, 20, init - 1.5);
    }
    if (f.endereco.cep) {
      init += 6;
      documento.text(
        'Endereço: ' +
          f.endereco.logradouro +
          ', ' +
          f.endereco.numero +
          ', ' +
          f.endereco.complemento +
          ', bairro ' +
          f.endereco.bairro +
          ', CEP: ' +
          f.endereco.cep,
        20,
        init - 1.5
      );
      init += 6;
      documento.text(
        'Município: ' + f.endereco.municipio + ' - ' + f.endereco.uf,
        20,
        init - 1.5
      );
    }
    documento.rect(19, rectFornInit, 170, init - rectFornInit);
    ifo++;
  }
  init += 6;
  documento.line(19, init, 189, init);

  init += 12;
  documento.setFontStyle('bold');
  documento.setFontSize(14);
  documento.text('SÍNTESE DA RECLAMAÇÃO', 70, init);

  init += 12;
  documento.setFontSize(12);
  documento.setFontStyle('normal');
  const wText = documento.splitTextToSize(processo.relato, 170);
  documento.text(wText, 20, init);

  init += 160;
  documento.setFontStyle('bold');
  documento.text('Consumidor', 20, init);
  documento.text('PROCON', 160, init);

  documento.output('dataurlnewwindow');
}
