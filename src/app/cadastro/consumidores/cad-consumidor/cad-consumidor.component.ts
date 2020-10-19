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
import { Consumidor } from 'src/app/models/consumidor';
import { ConsumidorService } from 'src/app/services/consumidor.service';
import { EnumService } from 'src/app/services/enum.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-cad-consumidor',
  templateUrl: './cad-consumidor.component.html',
  styleUrls: ['./cad-consumidor.component.css'],
})
export class CadConsumidorComponent implements OnInit, AfterViewInit {
  isLoading = false;
  idConsumidor: number;
  form: FormGroup;
  tipos: string[];
  fones: string[];
  @Input() idExterno: number;
  @Output() salvo = new EventEmitter<Consumidor>();
  @ViewChild('modal', { static: false })
  modal: ModalComponent;
  @ViewChild('input', { static: false })
  input: ElementRef<HTMLSelectElement>;
  @ViewChild('scrollInit', { static: false })
  scrollInit: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private enumService: EnumService,
    private consumidorService: ConsumidorService
  ) {}

  ngOnInit(): void {
    this.enumService.getTiposPessoa().subscribe((t) => (this.tipos = t));

    this.form = this.builder.group({
      tipo: ['FISICA', [Validators.required]],
      denominacao: ['', [Validators.required]],
      cadastro: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
        this.consumidorService.checkCadExiste(this.idConsumidor),
      ],
      email: ['', [Validators.email]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      uf: [null, [Validators.required]],
    });

    this.route.paramMap.subscribe((values) => {
      if (values.get('id')) {
        const cons: Consumidor = this.route.snapshot.data['consumidor'];
        this.fones = cons.fones;
        this.idConsumidor = cons.id;
        this.carregaForm(cons);
      } else if (this.idExterno) {
        this.isLoading = true;
        this.consumidorService.buscar(this.idExterno).subscribe(
          (c) => this.carregaForm(c),
          (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          () => {
            this.isLoading = false;
            this.idConsumidor = this.idExterno;
          }
        );
      } else {
        this.fones = [];
        this.idConsumidor = null;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.scrollInit.nativeElement.scrollTo();
    }, 100);
  }

  private carregaForm(cons: Consumidor) {
    this.form.patchValue({
      tipo: cons.tipo,
      denominacao: cons.denominacao,
      cadastro: cons.cadastro,
      email: cons.email,
      cep: cons.endereco?.cep,
      logradouro: cons.endereco?.logradouro,
      numero: cons.endereco?.numero,
      complemento: cons.endereco?.complemento,
      bairro: cons.endereco?.bairro,
      municipio: cons.endereco?.municipio,
      uf: cons.endereco?.uf,
    });
  }

  private carregaCons(): Consumidor {
    return new Consumidor(
      this.idConsumidor ? this.idConsumidor : null,
      this.form.get('tipo').value,
      this.form.get('denominacao').value.toUpperCase(),
      this.form.get('cadastro').value,
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

  salvar() {
    this.isLoading = true;
    let cons: Consumidor;
    if (!this.idConsumidor) {
      this.consumidorService.salvar(this.carregaCons()).subscribe({
        next: (c) => (cons = c),
        error: (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        complete: () => {
          this.isLoading = false;
          this.procedimentoSalvar(cons);
        },
      });
    } else {
      this.consumidorService
        .atualizar(this.idConsumidor, this.carregaCons())
        .subscribe({
          next: (c) => (cons = c),
          error: (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          complete: () => {
            this.isLoading = false;
            this.procedimentoSalvar(cons);
          },
        });
    }
  }

  private procedimentoSalvar(cons: Consumidor) {
    if (this.idExterno) {
      this.salvo.emit(cons);
    } else {
      this.router.navigate(['/cadastro/consumidores']);
    }
  }

  getMascaraCadastro(): string {
    const tipo = this.form.get('tipo').value;
    if (tipo === 'FISICA') {
      return '000.000.000-00';
    } else {
      return '00.000.000/0000-00';
    }
  }
}
