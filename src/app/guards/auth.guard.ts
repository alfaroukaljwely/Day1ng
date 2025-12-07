import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/Auth';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
   return authService.isloggedIn().pipe(
    map(isLogged => isLogged ? true : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
