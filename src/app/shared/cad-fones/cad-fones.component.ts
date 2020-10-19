import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getMascaraFone } from 'src/app/utils/fone.utils';

@Component({
  selector: 'app-cad-fones',
  templateUrl: './cad-fones.component.html',
  styleUrls: ['./cad-fones.component.css'],
})
export class CadFonesComponent implements OnInit {
  @Input() fones: string[];
  formFone: FormGroup;
  iPlus = faPlus;
  iMinus = faMinus;

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.formFone = this.builder.group({
      fone: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  adicionaFone() {
    this.fones.push(this.formFone.get('fone').value);
    this.formFone.get('fone').reset();
  }

  removeFone(index: number) {
    this.fones.splice(index, 1);
  }

  getMascara(fone: string): string {
    return getMascaraFone(fone);
  }

  getMascaraInput(): string {
    return getMascaraFone(this.formFone.get('fone').value);
  }
}
