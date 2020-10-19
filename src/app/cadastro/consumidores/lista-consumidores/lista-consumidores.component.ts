import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { Page } from 'src/app/models/auxiliares/page';
import { RespModal } from 'src/app/models/auxiliares/resp-modal';
import { Consumidor } from 'src/app/models/consumidor';
import { ConsumidorService } from 'src/app/services/consumidor.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { mensagemPadrao } from 'src/app/utils/mensagem.utils';

@Component({
  selector: 'app-lista-consumidores',
  templateUrl: './lista-consumidores.component.html',
  styleUrls: ['./lista-consumidores.component.css'],
})
export class ListaConsumidoresComponent implements OnInit, AfterViewInit {
  isLoading = false;
  page: Page<Consumidor>;
  idConsumidor: number;
  searchForm: FormGroup;
  value: string;
  pagina = 1;
  iEdit = faEdit;
  iTrash = faTrash;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(
    private builder: FormBuilder,
    private consumidorService: ConsumidorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];

    this.searchForm = this.builder.group({
      input: [''],
    });
  }

  ngAfterViewInit() {
    this.searchForm
      .get('input')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.consumidorService.listarPor(value, 0, 20).subscribe(
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
      this.consumidorService.listarPor(this.value, pagina - 1, 20).subscribe(
        (p) => (this.page = p),
        (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        () => (this.isLoading = false)
      );
    } else {
      this.consumidorService.listar(pagina - 1, 20).subscribe(
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

  concordaModal(resp: RespModal) {
    if (resp.emissao) {
      this.excluir(this.idConsumidor);
    }
  }

  getMascara(tipo: string): string {
    if (tipo === 'FISICA') {
      return '000.000.000-00';
    } else {
      return '00.000.000/0000-00';
    }
  }

  chamaModal(id: number) {
    this.idConsumidor = id;
    this.modal.open(
      mensagemPadrao(
        null,
        'warning',
        'Atenção!!',
        'EXCLUIR definitamente o consumidor?'
      ),
      'e',
      true
    );
  }

  private excluir(id: number) {
    this.isLoading = true;
    this.consumidorService.excluir(id).subscribe({
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
