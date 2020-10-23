import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { ProcessoDto } from 'src/app/models/dto/processo-dto';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-por-prazo',
  templateUrl: './por-prazo.component.html',
  styleUrls: ['./por-prazo.component.css'],
})
export class PorPrazoComponent implements OnInit {
  isLoading = false;
  processos: ProcessoDto[];
  idProcesso: number;
  iEdit = faFolder;
  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.processos = this.route.snapshot.data['processos'];
  }
}
