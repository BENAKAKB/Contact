import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Adjust the path if your auth.service.ts is somewhere else

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log('Token in interceptor:', token);
  
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Request headers with token:', clonedReq.headers.keys());
      return next.handle(clonedReq);
    }
  
    console.log('Request headers without token:', req.headers.keys());
    return next.handle(req);
  }
  
}
