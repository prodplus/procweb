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
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Movimento } from 'src/app/models/auxiliares/movimento';
import { EnumService } from 'src/app/services/enum.service';
import { toDateApi } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-cad-movimento',
  templateUrl: './cad-movimento.component.html',
  styleUrls: ['./cad-movimento.component.css'],
})
export class CadMovimentoComponent implements OnInit, AfterViewInit {
  @Input() movimentacao: Movimento[];
  @Input() de: string;
  @Input() visualizar: Movimento;
  @Output() cadMovimento = new EventEmitter<Movimento>();
  movimentoForm: FormGroup;
  iWindowClose = faWindowClose;
  situacoes: string[];
  @ViewChild('inputInicio', { static: false })
  inputInicio: ElementRef<HTMLInputElement>;

  constructor(private builder: FormBuilder, private enumService: EnumService) {}

  ngOnInit(): void {
    this.enumService.getSituacoes().subscribe((s) => (this.situacoes = s));

    this.movimentoForm = this.builder.group({
      data: ['', [Validators.required]],
      de: [this.de, [Validators.required]],
      para: [null, [Validators.required]],
      averbacao: [''],
      auxD: [null],
      auxT: [null],
    });

    if (this.visualizar) {
      this.carregaForm(this.visualizar);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputInicio.nativeElement.focus();
    }, 100);
  }

  cancelar() {
    this.cadMovimento.emit(null);
  }

  private carregaForm(mov: Movimento) {
    this.movimentoForm.patchValue({
      data: mov.data,
      de: mov.de,
      para: mov.para,
      averbacao: mov.averbacao,
      auxD: mov.auxD,
      auxT: mov.auxT,
    });
  }

  private carregaMovimento(): Movimento {
    return new Movimento(
      toDateApi(new Date(this.movimentoForm.get('data').value)),
      this.movimentoForm.get('de').value,
      this.movimentoForm.get('para').value,
      this.movimentoForm.get('averbacao').value,
      this.movimentoForm.get('auxD').value
        ? toDateApi(new Date(this.movimentoForm.get('auxD').value))
        : null,
      this.movimentoForm.get('auxT').value
    );
  }

  salvar() {
    this.cadMovimento.emit(this.carregaMovimento());
  }
}
