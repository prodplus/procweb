import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcDesc } from '../models/dto/proc-desc';
import { ProcessoDto } from '../models/dto/processo-dto';

const URL = environment.url + '/operacoes';

@Injectable({ providedIn: 'root' })
export class OperacaoService {
  constructor(private http: HttpClient) {}

  porNotFornecedor(): Observable<ProcessoDto[]> {
    return this.http.get<ProcessoDto[]>(`${URL}/not_fornecedor`);
  }

  porNotConsumidor(): Observable<ProcessoDto[]> {
    return this.http.get<ProcessoDto[]>(`${URL}/not_consumidor`);
  }

  porPrazo(): Observable<ProcessoDto[]> {
    return this.http.get<ProcessoDto[]>(`${URL}/prazo`);
  }

  porAudiencia(): Observable<ProcessoDto[]> {
    return this.http.get<ProcessoDto[]>(`${URL}/audiencia`);
  }

  porAudienciaDesc(): Observable<ProcDesc[]> {
    return this.http.get<ProcDesc[]>(`${URL}/audiencia_desc`);
  }

  porNovos(): Observable<ProcessoDto[]> {
    return this.http.get<ProcessoDto[]>(`${URL}/novos`);
  }

  porAutosNovos(autos: string): Observable<ProcessoDto[]> {
    return this.http.post<ProcessoDto[]>(`${URL}/por_autos`, autos);
  }
}
