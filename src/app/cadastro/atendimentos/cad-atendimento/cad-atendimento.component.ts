import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/user.service';
import { Atendimento } from 'src/app/models/atendimento';
import { Consumidor } from 'src/app/models/consumidor';
import { AtendimentoForm } from 'src/app/models/form/atendimento-form';
import { Fornecedor } from 'src/app/models/fornecedor';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { toDateApi } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-cad-atendimento',
  templateUrl: './cad-atendimento.component.html',
  styleUrls: ['./cad-atendimento.component.css'],
})
export class CadAtendimentoComponent implements OnInit, AfterViewInit {
  isLoading = false;
  form: FormGroup;
  selecionandoConsumidor = false;
  selecionandoFornecedor = false;
  idConsumidor: number = null;
  idFornecedor: number = null;
  editandoCons = false;
  editandoForn = false;
  atendimento: Atendimento;
  iMinus = faMinus;
  @ViewChild('scrollConsumidor', { static: false })
  scrollConsumidor: ElementRef<HTMLDivElement>;
  @ViewChild('scrollFornecedor', { static: false })
  scrollFornecedor: ElementRef<HTMLDivElement>;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;
  @ViewChild('input', { static: false })
  input: ElementRef<HTMLInputElement>;

  constructor(
    private atendimentoService: AtendimentoService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      data: [toDateApi(new Date()), [Validators.required]],
      relato: [''],
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.atendimento = this.route.snapshot.data['atendimento'];
        this.carregaForm(this.atendimento);
      } else {
        this.atendimento = new Atendimento(
          null,
          [],
          [],
          toDateApi(new Date()),
          '',
          null
        );
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  private carregaForm(ate: Atendimento) {
    this.form.patchValue({
      data: ate.data,
      relato: ate.relato,
    });
  }

  private transformaConsumidores(consumidores: Consumidor[]): number[] {
    const ret: number[] = [];
    for (let cons of consumidores) {
      ret.push(cons.id);
    }
    return ret;
  }

  private transformaFornecedores(fornecedores: Fornecedor[]): number[] {
    const ret: number[] = [];
    for (let forn of fornecedores) {
      ret.push(forn.id);
    }
    return ret;
  }

  private carregaAtendimento(): AtendimentoForm {
    return new AtendimentoForm(
      this.atendimento.id ? this.atendimento.id : null,
      toDateApi(new Date(this.form.get('data').value)),
      this.transformaConsumidores(this.atendimento.consumidores),
      this.transformaFornecedores(this.atendimento.fornecedores),
      this.form.get('relato').value,
      this.userService.getIdUsuario()
    );
  }

  salvar() {
    this.isLoading = true;
    if (!this.atendimento.id) {
      this.atendimentoService.salvar(this.carregaAtendimento()).subscribe({
        error: (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/cadastro/atendimentos']);
        },
      });
    } else {
      this.atendimentoService
        .atualizar(this.atendimento.id, this.carregaAtendimento())
        .subscribe({
          error: (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          complete: () => {
            this.isLoading = false;
            this.router.navigate(['/cadastro/atendimentos']);
          },
        });
    }
  }

  selecionarConsumidor() {
    this.selecionandoConsumidor = !this.selecionandoConsumidor;
  }

  selecionarFornecedor() {
    this.selecionandoFornecedor = !this.selecionandoFornecedor;
  }

  consumidorSelecionado(cons: Consumidor): number {
    this.selecionandoConsumidor = false;
    this.idConsumidor = cons ? cons.id : 0;
    this.editandoCons = true;
    return this.idConsumidor;
  }

  novoConsumidor(e: boolean) {
    this.selecionandoConsumidor = false;
    if (e) {
      this.idConsumidor = 0;
      this.editandoCons = true;
    }
  }

  fornecedorSelecionado(forn: Fornecedor): number {
    this.selecionandoFornecedor = false;
    this.idFornecedor = forn ? forn.id : 0;
    this.editandoForn = true;
    return this.idFornecedor;
  }

  novoFornecedor(e: boolean) {
    this.selecionandoFornecedor = false;
    if (e) {
      this.idFornecedor = 0;
      this.editandoForn = true;
    }
  }

  consumidorSalvo(cons: Consumidor) {
    this.editandoCons = false;
    if (cons) {
      if (this.atendimento.consumidores.length > 0) {
        let index = -1;
        for (let c of this.atendimento.consumidores) {
          if (c.id == cons.id) {
            index = this.atendimento.consumidores.indexOf(c);
          }
        }
        if (index > -1) {
          this.atendimento.fornecedores.splice(index, 1);
        }
      }
      this.atendimento.consumidores.push(cons);
    }

    setTimeout(() => {
      this.scrollConsumidor.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  fornecedorSalvo(forn: Fornecedor) {
    this.editandoForn = false;
    if (forn) {
      if (this.atendimento.fornecedores.length > 0) {
        let index = -1;
        for (let f of this.atendimento.fornecedores) {
          if (f.id == forn.id) {
            index = this.atendimento.fornecedores.indexOf(f);
          }
        }
        if (index > -1) {
          this.atendimento.fornecedores.splice(index, 1);
        }
      }
      this.atendimento.fornecedores.push(forn);
    }

    setTimeout(() => {
      this.scrollFornecedor.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  removerConsumidor(index: number) {
    this.atendimento.consumidores.splice(index, 1);
  }

  removerFornecedor(index: number) {
    this.atendimento.fornecedores.splice(index, 1);
  }

  getMascaraCadastro(tipo: string): string {
    if (tipo === 'FISICA') {
      return '000.000.000-00';
    } else {
      return '00.000.000/0000-00';
    }
  }
}
