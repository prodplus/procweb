import * as jsPDF from 'jspdf';
import { Processo } from '../models/processo';
import { getMesExtenso } from './date.utils';

export function geraPdf(processo: Processo) {
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
    const ciText = documento.splitTextToSize(
      'Consumidor ' + ic + ': ' + c.denominacao,
      150
    );
    const linhasIdCons = ciText.length;
    documento.text(ciText, 20, init - 1.5);
    init += 6 * linhasIdCons;
    documento.setFontStyle('normal');
    const ceText = documento.splitTextToSize(
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
      170
    );
    documento.text(ceText, 20, init - 1.5);
    const linhasECons = ceText.length;
    init += 6 * linhasECons;
    const desc = c.tipo === 'FISICA' ? 'CPF: ' : 'CNPJ: ';
    let fones = '';
    for (const f of c.fones) {
      fones += f + ' ';
    }
    documento.text(desc + c.cadastro + ' / Fones: ' + fones, 20, init - 1.5);
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
    const fiText = documento.splitTextToSize(
      'Fornecedor ' + ifo + ': ' + `${f.fantasia} (${f.razaoSocial})`,
      170
    );
    const linhasIdForn = fiText.length;
    documento.text(fiText, 20, init - 1.5);
    documento.setFontStyle('normal');
    if (f.cnpj) {
      init += 6 * linhasIdForn;
      documento.text('CNPJ: ' + f.cnpj, 20, init - 1.5);
    }
    if (f.endereco.cep) {
      init += 6;
      const feText = documento.splitTextToSize(
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
        170
      );
      documento.text(feText, 20, init - 1.5);
      const linhasEForn = feText.length;
      init += 6 * linhasEForn;
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
  let cabecalhoForn = '';
  for (const f of processo.fornecedores) {
    cabecalhoForn += f.fantasia + ' (' + f.razaoSocial + '), ';
  }
  const cabecalho = `O(a) consumidor(a) ${processo.consumidores[0].denominacao}, portador(a) do CPF nº ${processo.consumidores[0].cadastro}, formalizou reclamação em desfavor do(s) fornecedor(es): ${cabecalhoForn}, alegando em síntese o que segue:`;
  const cText = documento.splitTextToSize(cabecalho, 170);
  documento.text(cText, 20, init);

  init += 12;
  documento.setFontSize(12);
  documento.setFontStyle('normal');
  const wText = documento.splitTextToSize(processo.relato, 170);
  documento.text(wText, 20, init);

  documento.setFontStyle('bold');
  documento.text('Consumidor', 20, 280);
  documento.text('PROCON', 160, 280);

  documento.output('dataurlnewwindow');
}
