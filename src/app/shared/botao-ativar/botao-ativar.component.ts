import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-botao-ativar',
  templateUrl: './botao-ativar.component.html',
  styleUrls: ['./botao-ativar.component.css'],
})
export class BotaoAtivarComponent implements OnInit {
  @Input() ativos: boolean;
  @Output() ativar = new EventEmitter<boolean>();
  iToggleOn = faToggleOn;
  iToggleOff = faToggleOff;

  constructor() {}

  ngOnInit(): void {}

  ativarClick() {
    this.ativar.emit(true);
  }
}
