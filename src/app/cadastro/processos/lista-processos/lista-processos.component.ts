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
import { ProcessoDto } from 'src/app/models/dto/processo-dto';
import { DocumentoService } from 'src/app/services/documento.service';
import { EnumService } from 'src/app/services/enum.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { impressaoUtils } from 'src/app/utils/impressao.utils';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.css'],
})
export class ListaProcessosComponent implements OnInit, AfterViewInit {
  isLoading = false;
  page: Page<ProcessoDto>;
  idProcesso: number;
  iFolder = faFolderOpen;
  iPrint = faPrint;
  iTrash = faTrash;
  searchCons: FormGroup;
  consValue: string;
  searchForn: FormGroup;
  fornValue: string;
  searchAutos: FormGroup;
  autosValue: string;
  searchSit: FormGroup;
  sitValue: string;
  situacoes: string[];
  pagina = 1;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private processoService: ProcessoService,
    private documentoService: DocumentoService,
    private builder: FormBuilder,
    private enumService: EnumService
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];

    this.enumService.getSituacoes().subscribe((s) => (this.situacoes = s));

    this.searchAutos = this.builder.group({
      input: [''],
    });

    this.searchCons = this.builder.group({
      input: [''],
    });

    this.searchForn = this.builder.group({
      input: [''],
    });

    this.searchSit = this.builder.group({
      input: [null],
    });
  }

  ngAfterViewInit(): void {
    this.searchAutos
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.pagina = 1;
          this.autosValue = value;
          this.recarregarAutos(this.autosValue, this.pagina);
        } else {
          this.pagina = 1;
          this.autosValue = null;
          this.recarregar(this.pagina);
        }
      });

    this.searchCons
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.pagina = 1;
          this.consValue = value;
          this.recarregarCons(this.consValue, this.pagina);
        } else {
          this.pagina = 1;
          this.consValue = null;
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
          this.recarregarForn(this.fornValue, this.pagina);
        } else {
          this.pagina = 1;
          this.fornValue = null;
          this.recarregar(this.pagina);
        }
      });

    this.searchSit
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.pagina = 1;
          this.sitValue = value;
          this.recarregarSituacao(this.sitValue, this.pagina);
        } else {
          this.pagina = 1;
          this.sitValue = null;
          this.recarregar(this.pagina);
        }
      });
  }

  private recarregar(pagina: number) {
    this.processoService.listar(pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  private recarregarAutos(value: string, pagina: number) {
    this.processoService.listarPorAutos(value, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  private recarregarCons(value: string, pagina: number) {
    this.processoService.listarPorConsumidor(value, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  private recarregarForn(value: string, pagina: number) {
    this.processoService.listarPorFornecedor(value, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  private recarregarSituacao(value: string, pagina: number) {
    this.processoService.listarPorSituacao(value, pagina - 1, 20).subscribe(
      (p) => (this.page = p),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  resetar() {
    this.autosValue = null;
    this.searchAutos.reset();
    this.consValue = null;
    this.searchCons.reset();
    this.fornValue = null;
    this.searchForn.reset();
    this.sitValue = null;
    this.searchSit.reset();
    this.pagina = 1;
    this.recarregar(this.pagina);
  }

  mudaPagina(pagina: number) {
    this.pagina = pagina;
    if (this.autosValue) {
      this.recarregarAutos(this.autosValue, this.pagina);
    } else if (this.consValue) {
      this.recarregarCons(this.consValue, this.pagina);
    } else if (this.fornValue) {
      this.recarregarForn(this.fornValue, this.pagina);
    } else if (this.sitValue) {
      this.recarregarSituacao(this.sitValue, this.pagina);
    } else {
      this.recarregar(this.pagina);
    }
  }

  getRowClass(processo: ProcessoDto): string {
    switch (processo.situacao) {
      case 'GERAL':
        return 'table-light';
      case 'AUTUADO':
        return 'table-info';
      case 'CONCLUSO':
        return 'table-success';
      case 'AUDIENCIA':
        return 'table-warning';
      case 'NOTIFICAR_FORNECEDOR':
        return 'table-danger';
      case 'NOTIFICAR_CONSUMIDOR':
        return 'table-danger';
      case 'ENCERRADO':
        return 'table-secondary';
      case 'RESOLVIDO':
        return 'table-secondary';
      case 'NAO_RESOLVIDO':
        return 'table-secondary';
      case 'PRAZO':
        return 'table-danger';
      default:
        return 'table-light';
    }
  }

  inicial(id: number) {
    this.isLoading = true;
    this.documentoService.inicial(id).subscribe(
      (x) => impressaoUtils(x, id, 'inicial'),
      (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      () => (this.isLoading = false)
    );
  }

  preparaExcluir(id: number) {
    this.idProcesso = id;
    this.modal.open(
      mensagemPadrao(
        null,
        'warning',
        'Atenção!!',
        'EXCLUIR definitivamente o processo??'
      ),
      'e',
      true
    );
  }

  concordou(resp: RespModal) {
    if (resp.emissao) {
    }
  }

  private excluir(id: number) {
    this.isLoading = true;
    this.processoService.excluir(id).subscribe({
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
