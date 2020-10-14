import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EnumService } from 'src/app/services/enum.service';
import { buscaCep } from 'src/app/utils/busca-cep';

@Component({
  selector: 'app-cad-endereco',
  templateUrl: './cad-endereco.component.html',
  styleUrls: ['./cad-endereco.component.css'],
})
export class CadEnderecoComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('inputNro', { static: false })
  inputNro: ElementRef<HTMLInputElement>;
  iSearch = faSearch;
  ufs: string[];

  constructor(
    private cepService: NgxViacepService,
    private enumService: EnumService
  ) {}

  ngOnInit(): void {
    this.enumService.getUfs().subscribe((u) => (this.ufs = u));
  }

  buscaEnderecoPorCep() {
    buscaCep(this.form, this.cepService);
    this.inputNro.nativeElement.focus();
  }
}
