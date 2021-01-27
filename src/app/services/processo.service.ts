import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FornecedorNro } from '../models/auxiliares/fornecedor-nro';
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

  listarPorSituacao2(
    situacao: string,
    situacao2: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.get<Page<ProcessoDto>>(
      `${URL}/porsituacao/${pagina}/${quant}/${situacao}/${situacao2}`
    );
  }

  listarPorSituacao3(
    situacao: string,
    situacao2: string,
    autos: string,
    pagina: number,
    quant: number
  ): Observable<Page<ProcessoDto>> {
    return this.http.put<Page<ProcessoDto>>(
      `${URL}/porsituacao/${pagina}/${quant}/${situacao}/${situacao2}`,
      autos
    );
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  getAutos(data: string): Observable<{ nro: string }> {
    return this.http.get<{ nro: string }>(`${URL}/autos/${data}`);
  }

  ranking(ano: number): Observable<FornecedorNro[]> {
    return this.http.get<FornecedorNro[]>(`${URL}/ranking/${ano}`);
  }
}
