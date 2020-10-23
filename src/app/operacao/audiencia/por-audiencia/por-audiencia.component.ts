import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFolder, faPrint } from '@fortawesome/free-solid-svg-icons';
import { ProcDesc } from 'src/app/models/dto/proc-desc';
import { Processo } from 'src/app/models/processo';
import { DocumentoService } from 'src/app/services/documento.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { impressaoUtils } from 'src/app/utils/impressao.utils';

@Component({
  selector: 'app-por-audiencia',
  templateUrl: './por-audiencia.component.html',
  styleUrls: ['./por-audiencia.component.css'],
})
export class PorAudienciaComponent implements OnInit {
  isLoading = false;
  processos: ProcDesc[];
  iFolder = faFolder;
  iPrint = faPrint;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentoService,
    private processoService: ProcessoService
  ) {}

  ngOnInit(): void {
    this.processos = this.route.snapshot.data['processos'];
  }

  convocacaoCons(id: number) {
    this.isLoading = true;
    let processo: Processo;
    this.processoService.buscar(id).subscribe(
      (p) => (processo = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => {
        this.docService.convAudCons(id, processo.movimentacao[0]).subscribe(
          (x) => impressaoUtils(x, id, 'conv_aud'),
          (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          () => (this.isLoading = false)
        );
      }
    );
  }

  convocacaoForn(id: number) {
    this.isLoading = false;
    let processo: Processo;
    this.processoService.buscar(id).subscribe(
      (p) => (processo = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => {
        this.docService.convAudForn(id, processo.movimentacao[0]).subscribe(
          (x) => impressaoUtils(x, id, 'conv_aud'),
          (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          () => (this.isLoading = false)
        );
      }
    );
  }
}
