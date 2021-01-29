import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimento } from '../models/auxiliares/movimento';

const URL = environment.url + '/documentos';

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  constructor(private http: HttpClient) {}

  notDezDias(idProc: number, idForn: number): Observable<Blob> {
    return this.http.get(`${URL}/not_dez_dias/${idProc}/${idForn}`, {
      responseType: 'blob',
    });
  }

  notCincoDias(idProc: number, idForn: number): Observable<Blob> {
    return this.http.get(`${URL}/not_cinco_dias/${idProc}/${idForn}`, {
      responseType: 'blob',
    });
  }

  notImpugnacao(idProc: number, idForn: number): Observable<Blob> {
    return this.http.get(`${URL}/not_impugnacao/${idProc}/${idForn}`, {
      responseType: 'blob',
    });
  }

  notMulta(idProc: number, idForn: number): Observable<Blob> {
    return this.http.get(`${URL}/not_multa/${idProc}/${idForn}`, {
      responseType: 'blob',
    });
  }

  despachoNot(idProc: number): Observable<Blob> {
    return this.http.get(`${URL}/despacho_not/${idProc}`, {
      responseType: 'blob',
    });
  }

  despachoAud(idProc: number, movimento: Movimento): Observable<Blob> {
    return this.http.put(`${URL}/despacho_aud/${idProc}`, movimento, {
      responseType: 'blob',
    });
  }

  notConsumidor(idProc: number): Observable<Blob> {
    return this.http.get(`${URL}/not_consumidor/${idProc}`, {
      responseType: 'blob',
    });
  }

  convAudCons(idProc: number, movimento: Movimento): Observable<Blob> {
    return this.http.put(`${URL}/conv_aud_cons/${idProc}`, movimento, {
      responseType: 'blob',
    });
  }

  convAudForn(idProc: number, movimento: Movimento): Observable<Blob> {
    return this.http.put(`${URL}/conv_aud_forn/${idProc}`, movimento, {
      responseType: 'blob',
    });
  }

  inicial(idProc: number): Observable<Blob> {
    return this.http.get(`${URL}/inicial/${idProc}`, {
      responseType: 'blob',
    });
  }

  oficio(idProc: number): Observable<Blob> {
    return this.http.get(`${URL}/oficio/${idProc}`, { responseType: 'blob' });
  }

  atendimento(idAte: number): Observable<Blob> {
    return this.http.get(`${URL}/atendimento/${idAte}`, {
      responseType: 'blob',
    });
  }
}
