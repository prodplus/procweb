import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-cad-fornecedor',
  templateUrl: './cad-fornecedor.component.html',
  styleUrls: ['./cad-fornecedor.component.css'],
})
export class CadFornecedorComponent implements OnInit, AfterViewInit {
  isLoading = false;
  idFornecedor: number;
  form: FormGroup;
  fones: string[];
  iWindowClose = faWindowClose;
  @Input() idExterno: number;
  @Output() salvo = new EventEmitter<Fornecedor>();
  @ViewChild('modal', { static: false })
  modal: ModalComponent;
  @ViewChild('input', { static: false })
  input: ElementRef<HTMLInputElement>;
  @ViewChild('scrollInit', { static: false })
  scrollInit: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      fantasia: ['', [Validators.required]],
      razao: [''],
      cnpj: [''],
      email: ['', [Validators.email]],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      municipio: [''],
      uf: [null],
    });

    this.route.paramMap.subscribe((values) => {
      if (values.get('id')) {
        const forn: Fornecedor = this.route.snapshot.data['fornecedor'];
        this.fones = forn?.fones;
        this.idFornecedor = forn.id;
        this.carregaForm(forn);
      } else if (this.idExterno) {
        this.isLoading = true;
        this.fornecedorService.buscar(this.idExterno).subscribe(
          (c) => this.carregaForm(c),
          (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          () => {
            this.isLoading = false;
            this.idFornecedor = this.idExterno;
          }
        );
      } else if (this.idExterno == 0) {
        this.idExterno = 1;
        this.fones = [];
        this.idFornecedor = null;
      } else {
        this.fones = [];
        this.idFornecedor = null;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.scrollInit.nativeElement.scrollTo();
    }, 100);
  }

  private carregaForm(forn: Fornecedor) {
    this.form.patchValue({
      fantasia: forn.fantasia,
      razao: forn.razaoSocial,
      cnpj: forn.cnpj,
      email: forn.email,
      cep: forn.endereco?.cep,
      logradouro: forn.endereco?.logradouro,
      numero: forn.endereco?.numero,
      complemento: forn.endereco?.complemento,
      bairro: forn.endereco?.bairro,
      municipio: forn.endereco?.municipio,
      uf: forn.endereco?.uf,
    });
  }

  private carregaForn(): Fornecedor {
    return new Fornecedor(
      this.idFornecedor ? this.idFornecedor : null,
      this.form.get('fantasia').value.toUpperCase(),
      this.form.get('razao').value.toUpperCase(),
      this.form.get('cnpj').value,
      this.form.get('email').value,
      this.form.get('cep').value,
      this.form.get('logradouro').value,
      this.form.get('numero').value,
      this.form.get('complemento').value,
      this.form.get('bairro').value,
      this.form.get('municipio').value,
      this.form.get('uf').value,
      this.fones
    );
  }

  private procedimentoSalvar(forn: Fornecedor) {
    if (this.idExterno) {
      this.salvo.emit(forn);
    } else {
      this.router.navigate(['/cadastro/fornecedores']);
    }
  }

  salvar() {
    this.isLoading = true;
    let forn: Fornecedor;
    if (!this.idFornecedor) {
      this.fornecedorService.salvar(this.carregaForn()).subscribe(
        (f) => (forn = f),
        (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        () => {
          this.isLoading = false;
          this.procedimentoSalvar(forn);
        }
      );
    } else {
      this.fornecedorService
        .atualizar(this.idFornecedor, this.carregaForn())
        .subscribe(
          (f) => (forn = f),
          (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          () => {
            this.isLoading = false;
            this.procedimentoSalvar(forn);
          }
        );
    }
  }

  cancelarExterno() {
    this.salvo.emit(null);
  }
}
