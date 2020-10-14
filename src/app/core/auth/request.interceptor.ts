import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getExcecoes } from 'src/app/utils/url-excecoes';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      if (this.verficaExcecoes(req.url)) {
        req = req.clone({
          setHeaders: {
            Authorization: token,
          },
        });
      }
    }
    return next.handle(req);
  }

  private verficaExcecoes(url: string): boolean {
    const urls = getExcecoes();
    for (let u of urls) {
      if (url.startsWith(u, 0)) {
        return false;
      }
    }
    return true;
  }
}
