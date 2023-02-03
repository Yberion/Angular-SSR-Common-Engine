import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformServer, PathLocationStrategy } from '@angular/common';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object, private readonly location: PathLocationStrategy) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let cloneRequest: HttpRequest<unknown> = request;

    console.log(request);
    console.log(this.location.getBaseHref());

    if (isPlatformServer(this.platformId) && request.url.startsWith('/api')) {
      cloneRequest = request.clone({
        url: `${this.location.getBaseHref()}${request.url}`
      });
    }

    return next.handle(cloneRequest);
  }
}
