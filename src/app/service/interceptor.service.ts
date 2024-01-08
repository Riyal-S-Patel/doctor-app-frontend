import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = sessionStorage.getItem('tkn');
    console.log("token ::::::::",token);
    if(token){
      console.log("is Valid ::::::::",(req.url.indexOf('login')));
      if(req.url.indexOf('login') < 0 || req.url.indexOf('register') < 0){
        req = req.clone({
          setHeaders: { 
            Authorization: `Bearer ${token}`
        }
        });
        console.log(req);
      }
    }


    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
