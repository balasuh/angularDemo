import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('HTTP Interceptor: ', request);
    if (request.method === 'POST') {
      const newRequest = request.clone({ headers: new HttpHeaders({'token': 'asdasdsa5d151515'})});
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
