import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faFolderOpen,
  faPrint,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { Page } from 'src/app/models/auxiliares/page';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { AtendimentoDto } from 'src/app/models/dto/atendimento-dto';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { impressaoUtils } from 'src/app/utils/impressao.utils';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-lista-atendimentos',
  templateUrl: './lista-atendimentos.component.html',
  styleUrls: ['./lista-atendimentos.component.css'],
})
export class ListaAtendimentosComponent implements OnInit, AfterViewInit {
  isLoading = false;
  page: Page<AtendimentoDto>;
  idAtendimento: number;
  iFolder = faFolderOpen;
  iPrint = faPrint;
  iTrash = faTrash;
  searchCons: FormGroup;
  consValue: string;
  searchForn: FormGroup;
  fornValue: string;
  pagina = 1;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private atendimentoService: AtendimentoService,
    private documentoService: DocumentoService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];

    this.searchCons = this.builder.group({
      input: [''],
    });

    this.searchForn = this.builder.group({
      input: [''],
    });
  }

  ngAfterViewInit(): void {
    this.searchCons
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.pagina = 1;
          this.consValue = value;
          this.recarregarPor(value, this.pagina);
        } else {
          this.pagina = 1;
          this.recarregar(this.pagina);
        }
      });

    this.searchForn
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.pagina = 1;
          this.fornValue = value;
          this.recarregarPor(value, this.pagina);
        } else {
          this.pagina = 1;
          this.recarregar(this.pagina);
        }
      });
  }

  private recarregar(pagina: number) {
    this.atendimentoService.listar(pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  private recarregarPor(value: string, pagina: number) {
    this.atendimentoService.listarPor(value, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  resetar() {
    this.consValue = null;
    this.searchCons.reset();
    this.fornValue = null;
    this.searchForn.reset();
    this.pagina = 1;
    this.recarregar(this.pagina);
  }

  mudaPagina(pagina: number) {
    this.pagina = pagina;
    if (this.consValue) {
      this.recarregarPor(this.consValue, this.pagina);
    } else if (this.fornValue) {
      this.recarregarPor(this.fornValue, this.pagina);
    } else {
      this.recarregar(this.pagina);
    }
  }

  imprimir(id: number) {
    this.isLoading = true;
    this.documentoService.atendimento(id).subscribe(
      (x) => impressaoUtils(x, id, 'atendimento'),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  preparaExcluir(id: number) {
    this.idAtendimento = id;
    this.modal.open(
      mensagemPadrao(
        null,
        'warning',
        'Atenção!!',
        'EXCLUIR definitivamente o atendimento!'
      ),
      'e',
      true
    );
  }

  concordou(resp: RespModal) {
    if (resp.emissao) {
      this.excluir(this.idAtendimento);
    }
  }

  private excluir(id: number) {
    this.isLoading = true;
    this.atendimentoService.excluir(id).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      complete: () => {
        this.isLoading = false;
        this.pagina = 1;
        this.resetar();
      },
    });
  }
}
