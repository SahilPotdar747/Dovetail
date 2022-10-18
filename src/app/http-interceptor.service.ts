import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpStatusCode,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComponentCommunicationService } from './component-communication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private commonService: ComponentCommunicationService) {}

  private totalRequests = 0;

  intercept(
    request: HttpRequest<unknown>,

    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;

    this.commonService.showLoader();

    const reqWithAuth = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    return next.handle(reqWithAuth).pipe(
      finalize(() => {
        this.totalRequests--;

        if (this.totalRequests === 0) {
          this.commonService.closeLoader();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // if (error.error) {
        //   if (error.status == HttpStatusCode.NotFound) {
        //     this.commonService.popUp('API Not found !!!');
        //   } else if (error.status == HttpStatusCode.InternalServerError) {
        //     this.commonService.popUp(
        //       error?.error?.message ?? 'Something went wrong !!!'
        //     );
        //   } else if (error.status == HttpStatusCode.Unauthorized) {
        //     this.commonService.popUp(
        //       'Unauthorized user, please login again !!!'
        //     );
        //   } else {
        //     this.commonService.popUp(error.error.message);
        //   }
        // }
        if (error) {
          this.commonService.popUp(error.error.message);
        }
        return throwError(error);
      })
    );
  }
}
