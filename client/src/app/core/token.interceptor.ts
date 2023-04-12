import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../modules/service/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthService)
  private router = inject(Router)
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isTokenExits = this.authService.isAuthenticated();
    const token = localStorage.getItem('blog-token');;
    const apiUrl = 'http://localhost:5500/api'

    request = request.clone({
      url: `${apiUrl}${request.url}`,
    });
    
    if (isTokenExits) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem('blog-token')
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    )
  }
}
