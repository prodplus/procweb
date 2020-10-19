import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, first, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../models/auxiliares/page';
import { Consumidor } from '../models/consumidor';

const URL = environment.url + '/consumidores';

@Injectable({ providedIn: 'root' })
export class ConsumidorService {
  constructor(private http: HttpClient) {}

  salvar(consumidor: Consumidor): Observable<Consumidor> {
    return this.http.post<Consumidor>(`${URL}`, consumidor);
  }

  atualizar(id: number, consumidor: Consumidor): Observable<Consumidor> {
    return this.http.put<Consumidor>(`${URL}/${id}`, consumidor);
  }

  buscar(id: number): Observable<Consumidor> {
    return this.http.get<Consumidor>(`${URL}/${id}`);
  }

  listar(pagina: number, quant: number): Observable<Page<Consumidor>> {
    return this.http.get<Page<Consumidor>>(`${URL}/listar/${pagina}/${quant}`);
  }

  listarPor(
    parametro: string,
    pagina: number,
    quant: number
  ): Observable<Page<Consumidor>> {
    return this.http.get<Page<Consumidor>>(
      `${URL}/listar/${pagina}/${quant}/${parametro}`
    );
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  consumidorExiste(cadastro: string): Observable<boolean> {
    return this.http.get<boolean>(`${URL}/existe/${cadastro}`);
  }

  checkCadExiste(id: number) {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap((cad) => this.consumidorExiste(cad)))
        .pipe(map((isTaken) => (isTaken && !id ? { consTaken: true } : null)))
        .pipe(tap((r) => console.log(r)))
        .pipe(first());
    };
  }
}
