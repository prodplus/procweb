import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCog, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Movimento } from 'src/app/models/auxiliares/movimento';
import { Consumidor } from 'src/app/models/consumidor';
import { ProcessoForm } from 'src/app/models/form/processo-form';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Processo } from 'src/app/models/processo';
import { EnumService } from 'src/app/services/enum.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { toDateApi } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-cad-processo',
  templateUrl: './cad-processo.component.html',
  styleUrls: ['./cad-processo.component.css'],
})
export class CadProcessoComponent implements OnInit, AfterViewInit {
  isLoading = false;
  processoForm: FormGroup;
  tipos: string[];
  situacoes: string[];
  temRepresentantes = false;
  selecionandoConsumidor = false;
  selecionandoFornecedor = false;
  selecionandoRepresentante = false;
  idConsumidor: number = null;
  idRepresentante: number = null;
  idFornecedor: number = null;
  editandoCons = false;
  editandoRepr = false;
  editandoForn = false;
  lancandoMov = false;
  processo: Processo;
  iCog = faCog;
  iMinus = faMinus;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;
  @ViewChild('input', { static: false })
  input: ElementRef<HTMLInputElement>;
  @ViewChild('scrollConsumidor', { static: false })
  scrollConsumidor: ElementRef<HTMLDivElement>;
  @ViewChild('scrollFornecedor', { static: false })
  scrollFornecedor: ElementRef<HTMLDivElement>;
  @ViewChild('scrollRepresentante', { static: false })
  scrollRepresentante: ElementRef<HTMLDivElement>;

  constructor(
    private processoService: ProcessoService,
    private enumService: EnumService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enumService.getTiposProcesso().subscribe((t) => (this.tipos = t));
    this.enumService.getSituacoes().subscribe((s) => (this.situacoes = s));

    this.processoForm = this.builder.group({
      data: [toDateApi(new Date()), [Validators.required]],
      autos: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[0-9]{3,4}/20[0-9][0-9]$'),
        ],
      ],
      tipo: ['RECLAMACAO', [Validators.required]],
      relato: [''],
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.processo = this.route.snapshot.data['processo'];
        if (this.processo.representantes.length > 0) {
          this.temRepresentantes = true;
        }
        this.carregaForm(this.processo);
      } else {
        this.processo = new Processo(
          null,
          'RECLAMACAO',
          null,
          [],
          [],
          [],
          toDateApi(new Date()),
          [],
          '',
          'AUTUADO'
        );
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  private carregaForm(proc: Processo) {
    this.processoForm.patchValue({
      data: proc.data,
      autos: proc.autos,
      tipo: proc.tipo,
      relato: proc.relato,
    });
  }

  private carregaProcesso(): ProcessoForm {
    return new ProcessoForm(
      this.processo.id ? this.processo.id : null,
      this.processoForm.get('tipo').value,
      this.processoForm.get('autos').value,
      this.transformaConsumidores(this.processo.consumidores),
      this.transformaConsumidores(this.processo.representantes),
      this.transformaFornecedores(this.processo.fornecedores),
      toDateApi(new Date(this.processoForm.get('data').value)),
      this.processoForm.get('relato').value,
      this.processo.situacao,
      this.processo.movimentacao
    );
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

  salvar() {
    this.isLoading = true;
    if (!this.processo.id) {
      this.processoService.salvar(this.carregaProcesso()).subscribe({
        error: (err) => {
          this.isLoading = false;
          this.modal.openPadrao(err);
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/cadastro/processos']);
        },
      });
    } else {
      console.log(this.carregaProcesso());
      this.processoService
        .atualizar(this.processo.id, this.carregaProcesso())
        .subscribe({
          error: (err) => {
            this.isLoading = false;
            this.modal.openPadrao(err);
          },
          complete: () => {
            this.isLoading = false;
            this.router.navigate(['/cadastro/processos']);
          },
        });
    }
  }

  getAutos() {
    this.processoService
      .getAutos(toDateApi(new Date(this.processoForm.get('data').value)))
      .subscribe(
        (a) => this.processoForm.get('autos').setValue(a.nro),
        (err) => this.modal.openPadrao(err)
      );
  }

  adicionarRepresentante() {
    this.temRepresentantes = !this.temRepresentantes;
  }

  selecionarConsumidor() {
    this.selecionandoConsumidor = !this.selecionandoConsumidor;
  }

  selecionarRepresentante() {
    this.selecionandoRepresentante = !this.selecionandoRepresentante;
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

  representanteSelecionado(repr: Consumidor): number {
    this.selecionandoRepresentante = false;
    this.idRepresentante = repr ? repr.id : 0;
    this.editandoRepr = true;
    return this.idRepresentante;
  }

  novoRepresentante(e: boolean) {
    this.selecionandoRepresentante = false;
    if (e) {
      this.idRepresentante = 0;
      this.editandoRepr = true;
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
      if (this.processo.consumidores.length > 0) {
        let index = -1;
        for (let c of this.processo.consumidores) {
          if (c.id == cons.id) {
            index = this.processo.consumidores.indexOf(c);
          }
        }
        if (index > -1) {
          this.processo.consumidores.splice(index, 1);
        }
      }
      this.processo.consumidores.push(cons);
    }

    setTimeout(() => {
      this.scrollConsumidor.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  representanteSalvo(rep: Consumidor) {
    this.editandoRepr = false;
    if (rep) {
      if (this.processo.representantes.length > 0) {
        let index = -1;
        for (let c of this.processo.representantes) {
          if (c.id == rep.id) {
            index = this.processo.representantes.indexOf(c);
          }
        }
        if (index > -1) {
          this.processo.representantes.splice(index, 1);
        }
      }
      this.processo.representantes.push(rep);
    }
    setTimeout(() => {
      this.scrollRepresentante.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }, 100);
  }

  fornecedorSalvo(forn: Fornecedor) {
    this.editandoForn = false;
    if (forn) {
      if (this.processo.fornecedores.length > 0) {
        let index = -1;
        for (let f of this.processo.fornecedores) {
          if (f.id == forn.id) {
            index = this.processo.fornecedores.indexOf(f);
          }
        }
        if (index > -1) {
          this.processo.fornecedores.splice(index, 1);
        }
      }
      this.processo.fornecedores.push(forn);
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
    this.processo.consumidores.splice(index, 1);
  }

  removerRepresentante(index: number) {
    this.processo.representantes.splice(index, 1);
  }

  removerFornecedor(index: number) {
    this.processo.fornecedores.splice(index, 1);
  }

  getMascaraCadastro(tipo: string): string {
    if (tipo === 'FISICA') {
      return '000.000.000-00';
    } else {
      return '00.000.000/0000-00';
    }
  }

  lancarMovimento() {
    this.lancandoMov = true;
  }

  registraMovimento(mov: Movimento) {
    if (mov) {
      this.processo.movimentacao.unshift(mov);
    }
    this.lancandoMov = false;
  }

  removerMovimento(index: number) {
    this.processo.movimentacao.splice(index, 1);
  }
}
