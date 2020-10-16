import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-controle-at',
  templateUrl: './controle-at.component.html',
  styleUrls: ['./controle-at.component.css'],
})
export class ControleAtComponent implements OnInit {
  @Input() rota: string[];
  @Input() ativos: boolean;
  @Input() mensagemNovo: string;
  @Output() ativar = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  ativarClick(a: boolean) {
    this.ativar.emit(a);
  }
}
