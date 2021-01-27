import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faFolder, faPrint } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { Page } from 'src/app/models/auxiliares/page';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { ProcessoDto } from 'src/app/models/dto/processo-dto';
import { DocumentoService } from 'src/app/services/documento.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { impressaoUtils } from 'src/app/utils/impressao.utils';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-novo-despacho',
  templateUrl: './novo-despacho.component.html',
  styleUrls: ['./novo-despacho.component.css'],
})
export class NovoDespachoComponent implements OnInit, AfterViewInit {
  isLoading = false;
  processos: Page<ProcessoDto>;
  idProcesso: number;
  iFolder = faFolder;
  iPrint = faPrint;
  formSearch: FormGroup;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentoService,
    private builder: FormBuilder,
    private processoService: ProcessoService
  ) {}

  ngOnInit(): void {
    this.processos = this.route.snapshot.data['processos'];

    this.formSearch = this.builder.group({
      input: [''],
    });
  }

  ngAfterViewInit(): void {
    this.formSearch
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.processoService
            .listarPorAutos(value, 0, 20)
            .subscribe((p) => (this.processos = p));
        } else {
          this.recarregar();
        }
      });
  }

  private recarregar() {
    this.processoService
      .listarPorSituacao2('AUTUADO', 'CONCLUSO', 0, 20)
      .subscribe(
        (p) => (this.processos = p),
        (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        () => (this.isLoading = false)
      );
  }

  preparaImprimir(id: number) {
    this.idProcesso = id;
    this.modal.open(
      mensagemPadrao(
        null,
        'warning',
        'Atenção!!',
        'Tem certeza que deseja despachar este Processo??'
      ),
      'e',
      true
    );
  }

  concordou(resp: RespModal) {
    if (resp.emissao) {
      this.imprimirDespacho(this.idProcesso);
    }
  }

  private imprimirDespacho(id: number) {
    this.isLoading = true;
    this.docService.despachoNot(id).subscribe(
      (x) => impressaoUtils(x, id, 'desp_of'),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => this.recarregar()
    );
  }
}
