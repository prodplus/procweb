import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Processo } from 'src/app/models/processo';
import { DocumentoService } from 'src/app/services/documento.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { impressaoUtils } from 'src/app/utils/impressao.utils';

@Component({
  selector: 'app-not-fornecedor',
  templateUrl: './not-fornecedor.component.html',
  styleUrls: ['./not-fornecedor.component.css'],
})
export class NotFornecedorComponent implements OnInit {
  isLoading = false;
  processo: Processo;
  iPrint = faPrint;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentoService
  ) {}

  ngOnInit(): void {
    this.processo = this.route.snapshot.data['processo'];
  }

  notDezDias(idForn: number) {
    this.isLoading = true;
    this.docService.notDezDias(this.processo.id, idForn).subscribe(
      (x) => impressaoUtils(x, this.processo.id, 'not_'),
      (err) => {
        this.modal.openPadrao(err);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  notCincoDias(idForn: number) {
    this.isLoading = true;
    this.docService.notCincoDias(this.processo.id, idForn).subscribe(
      (x) => impressaoUtils(x, this.processo.id, 'not_'),
      (err) => {
        this.modal.openPadrao(err);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  notImpugnacao(idForn: number) {
    this.isLoading = true;
    this.docService.notImpugnacao(this.processo.id, idForn).subscribe(
      (x) => impressaoUtils(x, this.processo.id, 'not_'),
      (err) => {
        this.modal.openPadrao(err);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  notMulta(idForn: number) {
    this.isLoading = true;
    this.docService.notMulta(this.processo.id, idForn).subscribe(
      (x) => impressaoUtils(x, this.processo.id, 'not_'),
      (err) => {
        this.modal.openPadrao(err);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  inicial() {
    this.isLoading = true;
    this.docService.inicial(this.processo.id).subscribe(
      (x) => impressaoUtils(x, this.processo.id, 'not_'),
      (err) => {
        this.modal.openPadrao(err);
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }

  getMascaraCadastro(tipo: string): string {
    if (tipo === 'FISICA') {
      return '000.000.000-00';
    } else {
      return '00.000.000/0000-00';
    }
  }
}
