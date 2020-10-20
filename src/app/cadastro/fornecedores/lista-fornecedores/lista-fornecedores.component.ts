import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { Page } from 'src/app/models/auxiliares/page';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-lista-fornecedores',
  templateUrl: './lista-fornecedores.component.html',
  styleUrls: ['./lista-fornecedores.component.css'],
})
export class ListaFornecedoresComponent implements OnInit, AfterViewInit {
  isLoading = false;
  page: Page<Fornecedor>;
  idFornecedor: number;
  searchForm: FormGroup;
  value: string;
  pagina = 1;
  iEdit = faEdit;
  iTrash = faTrash;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private builder: FormBuilder,
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];

    this.searchForm = this.builder.group({
      input: [''],
    });
  }

  ngAfterViewInit(): void {
    this.searchForm
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.fornecedorService.listarPor(value, 0, 20).subscribe(
            (p) => (this.page = p),
            (err) => this.modal.openPadrao(err),
            () => {
              this.value = value;
              this.pagina = 1;
              this.recarregar(this.pagina);
            }
          );
        } else {
          this.value = null;
          this.pagina = 1;
          this.recarregar(this.pagina);
        }
      });
  }

  private recarregar(pagina: number) {
    if (this.value) {
      this.fornecedorService.listarPor(this.value, pagina - 1, 20).subscribe(
        (p) => (this.page = p),
        (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        () => (this.isLoading = false)
      );
    } else {
      this.fornecedorService.listar(pagina - 1, 20).subscribe(
        (p) => (this.page = p),
        (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        () => (this.isLoading = false)
      );
    }
  }

  mudaPagina(pagina: number) {
    this.pagina = pagina;
    this.recarregar(this.pagina);
  }

  chamaModal(id: number) {
    this.idFornecedor = id;
    this.modal.open(
      mensagemPadrao(
        null,
        'warning',
        'Atenção!!',
        'EXCLUIR definitivamente o fornecedor??'
      ),
      'e',
      true
    );
  }

  concordaModal(resp: RespModal) {
    if (resp.emissao) {
      this.excluir(this.idFornecedor);
    }
  }

  private excluir(id: number) {
    this.isLoading = true;
    this.fornecedorService.excluir(id).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
      },
      complete: () => {
        this.isLoading = false;
        this.recarregar(this.pagina);
      },
    });
  }
}
