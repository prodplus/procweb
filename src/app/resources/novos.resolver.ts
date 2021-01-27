import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../models/auxiliares/page';
import { ProcessoDto } from '../models/dto/processo-dto';
import { ProcessoService } from '../services/processo.service';

@Injectable({ providedIn: 'root' })
export class NovosResolver implements Resolve<Observable<Page<ProcessoDto>>> {
  constructor(private service: ProcessoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page<ProcessoDto>> {
    return this.service.listarPorSituacao2('AUTUADO', 'CONCLUSO', 0, 20);
  }
}
