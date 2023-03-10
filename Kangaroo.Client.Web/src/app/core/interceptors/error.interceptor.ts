import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401) {
        // auto logout if 401 response returned from api
      }

      if (error.status === 404) {

      }

      if (error.status === 500) {

      }


      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        // console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.error(
        //   `Backend returned code ${error.status}, ` +
        //   `body was: ${error.error}`);
      }


      // return an observable with a user-facing error message
      return throwError(`${error.error.message}`);
    }));

  }
}
