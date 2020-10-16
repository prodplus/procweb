export interface Mensagem {
  tipo: string;
  titulo: string;
  mensagem: string;
}

export function mensagemPadrao(
  err,
  tipo: string,
  titulo: string,
  mensagem: string
): Mensagem {
  const retorno = {
    tipo: 'modal-title text-' + tipo,
    titulo: titulo,
    mensagem: mensagem,
  };

  if (retorno.mensagem === '') {
    console.log(err);
    retorno.mensagem = err.error.message;
  } else if (retorno.mensagem === 'sem') {
    retorno.mensagem = '';
  }

  return retorno;
}

export function trataOperacao(opcao: string, tipo: string): string {
  return opcao === 'e'
    ? 'EXCLUIR definitivamente ' + tipo + '?'
    : opcao === 'd'
    ? 'DESATIVAR ' + tipo + '?'
    : opcao === 'a'
    ? 'ATIVAR ' + tipo + '?'
    : '';
}
