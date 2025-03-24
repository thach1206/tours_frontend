import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './app/services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();

    if (token) {
      const newReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });

      return next.handle(newReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Xử lý lỗi tại đây
          console.error('Xảy ra lỗi:', error.error || error.statusText);
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
