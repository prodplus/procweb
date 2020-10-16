import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, first, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../models/auxiliares/page';
import { UsuarioDto } from '../models/dto/usuario-dto';
import { UsuarioForm } from '../models/form/usuario-form';
import { Perfil } from '../models/perfil';

const URL = environment.url + '/usuarios';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private http: HttpClient) {}

  salvar(usuario: UsuarioForm): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(`${URL}`, usuario);
  }

  atualizar(id: number, usuario: UsuarioForm): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${URL}/${id}`, usuario);
  }

  buscar(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${URL}/${id}`);
  }

  listarAtivos(
    ativos: boolean,
    pagina: number,
    quant: number
  ): Observable<Page<UsuarioDto>> {
    return this.http.get<Page<UsuarioDto>>(
      `${URL}/listar/${pagina}/${quant}/${ativos}`
    );
  }

  ativar(id: number, ativar: boolean): Observable<any> {
    return this.http.delete(`${URL}/ativar/${id}/${ativar}`);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${URL}/perfis`);
  }

  emailDisponivel(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${URL}/email_existe/${email}`);
  }

  checkEmailTaken(id: number) {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap((email) => this.emailDisponivel(email)))
        .pipe(map((isTaken) => (isTaken && !id ? { emailTaken: true } : null)))
        .pipe(tap((r) => console.log(r)))
        .pipe(first());
    };
  }
}
