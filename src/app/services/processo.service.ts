import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/auxiliares/page';
import { ProcessoDto } from '../models/dto/processo-dto';
import { ProcessoForm } from '../models/form/processo-form';
import { Processo } from '../models/processo';

const URL = environment.url + '/processos';

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  constructor(private http: HttpClient) {}

  salvar(processo: ProcessoForm): Observable<ProcessoDto> {
    return this.http.post<ProcessoDto>(`${URL}`, processo);
  }

  atualizar(id: number, processo: ProcessoForm): Observable<ProcessoDto> {
    return this.http.put<ProcessoDto>(`${URL}/${id}`, processo);
  }

  buscar(id: number): Observable<Processo> {
    return this.http.get<Processo>(`${URL}/${id}`);
  }

  listar(pagina: number, quant: number): Observable<Page<ProcessoDto>> {
    return this.http.get<Page<ProcessoDto>>(`${URL}/listar/${pagina}/${quant}`);
  }

  listarPorAutos(
    autos: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.put<Page<ProcessoDto>>(
      `${URL}/porautos/${pagina}/${quant}`,
      autos
    );
  }

  listarPorConsumidor(
    param: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.get<Page<ProcessoDto>>(
      `${URL}/porconsumidor/${pagina}/${quant}/${param}`
    );
  }

  listarPorFornecedor(
    param: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.get<Page<ProcessoDto>>(
      `${URL}/porfornecedor/${pagina}/${quant}/${param}`
    );
  }

  listarPorSituacao(
    situacao: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.get<Page<ProcessoDto>>(
      `${URL}/porsituacao/${pagina}/${quant}/${situacao}`
    );
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  getAutos(data: string): Observable<string> {
    return this.http.get<string>(`${URL}/autos/${data}`);
  }
}
