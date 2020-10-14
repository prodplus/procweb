import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Page } from 'src/app/models/auxiliares/page';
import { Consumidor } from 'src/app/models/consumidor';

@Component({
  selector: 'app-selec-cons',
  templateUrl: './selec-cons.component.html',
  styleUrls: ['./selec-cons.component.css'],
})
export class SelecConsComponent implements OnInit {
  searchForm: FormGroup;
  page: Page<Consumidor> = new Page<Consumidor>();
  iCheck = faCheck;
  @Output() selecao = new EventEmitter<Consumidor>();

  constructor() {}

  ngOnInit(): void {}
}
