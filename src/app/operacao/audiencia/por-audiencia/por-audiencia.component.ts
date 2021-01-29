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
  rowClass: string;
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

  getRowClass(i: number): string {
    if (i == 0) {
      this.rowClass = 'table-danger';
      return this.rowClass;
    } else {
      const data1 = this.processos[i - 1].descricao.substring(0, 4);
      const data2 = this.processos[i].descricao.substring(0, 4);
      if (data1 !== data2) {
        if (this.rowClass === 'table-danger') {
          this.rowClass = 'table-warning';
        } else {
          this.rowClass = 'table-danger';
        }
      }
      return this.rowClass;
    }
  }
}
