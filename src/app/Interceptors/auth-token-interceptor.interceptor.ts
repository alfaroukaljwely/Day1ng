import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../Services/Auth';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
   if (!isPlatformBrowser(platformId)) {
    return next(req);
  }
    const skipUrls = ['/login', '/register'];
     if (skipUrls.some(p => req.url.includes(p))) {
    return next(req);
  }

  let token : string | null = null;
  const authService = inject(AuthService);
  token = authService.getToken() ?? localStorage.getItem('token');
  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return next(authReq);
};
