import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faFile } from '@fortawesome/free-solid-svg-icons';
import { Movimento } from 'src/app/models/auxiliares/movimento';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { ProcessoDto } from 'src/app/models/dto/processo-dto';
import {
  ProcessoForm,
  transformaConsumidores,
  transformaFornecedores,
} from 'src/app/models/form/processo-form';
import { Processo } from 'src/app/models/processo';
import { OperacaoService } from 'src/app/services/operacao.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { toDateApi } from 'src/app/utils/date.utils';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-por-not-fornecedor',
  templateUrl: './por-not-fornecedor.component.html',
  styleUrls: ['./por-not-fornecedor.component.css'],
})
export class PorNotFornecedorComponent implements OnInit {
  isLoading = false;
  processos: ProcessoDto[];
  idProcesso: number;
  iFile = faFile;
  iCheck = faCheck;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private operacaoService: OperacaoService,
    private processoService: ProcessoService
  ) {}

  ngOnInit(): void {
    this.processos = this.route.snapshot.data['processos'];
  }

  private recarregar() {
    this.operacaoService.porNotFornecedor().subscribe(
      (p) => (this.processos = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  preparaConcluir(id: number) {
    this.idProcesso = id;
    this.modal.open(
      mensagemPadrao(null, 'warning', 'Atenção!!', 'CONCLUIR notificação??'),
      'c',
      true
    );
  }

  emissao(resp: RespModal) {
    let processo: Processo;
    if (resp.emissao) {
      this.processoService.buscar(this.idProcesso).subscribe(
        (p) => (processo = p),
        (err) => this.modal.openPadrao(err),
        () => {
          this.concluir(processo);
        }
      );
    }
  }

  private concluir(processo: Processo) {
    this.isLoading = true;
    const dataPrazo = new Date();
    dataPrazo.setDate(dataPrazo.getDate() + 10);
    const movimento = new Movimento(
      toDateApi(new Date()),
      'NOTIFICAR_FORNECEDOR',
      'GERAL',
      'Aguarda AR fornecedor',
      toDateApi(dataPrazo),
      null
    );
    processo.movimentacao.unshift(movimento);
    const processoForm: ProcessoForm = new ProcessoForm(
      processo.id,
      processo.tipo,
      processo.autos,
      transformaConsumidores(processo.consumidores),
      transformaConsumidores(processo.representantes),
      transformaFornecedores(processo.fornecedores),
      processo.data,
      processo.relato,
      processo.situacao,
      processo.movimentacao
    );
    this.processoService.atualizar(processo.id, processoForm).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      complete: () => {
        this.modal.open(
          mensagemPadrao(
            null,
            'success',
            'Processo Atualizado!',
            'Processo aguardando AR.'
          ),
          '',
          false
        );
        this.recarregar();
      },
    });
  }
}
