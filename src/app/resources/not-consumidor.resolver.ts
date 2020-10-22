import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProcessoDto } from '../models/dto/processo-dto';
import { OperacaoService } from '../services/operacao.service';

@Injectable({ providedIn: 'root' })
export class NotConsumidorResolver
  implements Resolve<Observable<ProcessoDto[]>> {
  constructor(private service: OperacaoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProcessoDto[]> {
    return this.service.porNotConsumidor();
  }
}
