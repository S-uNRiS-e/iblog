import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
    constructor(private router:Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 401:
                            this.router.navigate(['/login']);
                            break;
                        default:
                            break;
                    }
                    return throwError(error);
                })
            )
    }
}
