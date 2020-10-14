import { Component, Input, OnInit } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-botao-novo',
  templateUrl: './botao-novo.component.html',
  styleUrls: ['./botao-novo.component.css'],
})
export class BotaoNovoComponent implements OnInit {
  @Input() rota: string[];
  @Input() tipo: string;
  mensagem: string;
  icon = faFile;

  constructor() {}

  ngOnInit(): void {
    this.mensagem = 'cadastrar ' + this.tipo;
  }
}
