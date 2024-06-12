import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const isLoginRoute = route.routeConfig?.path === 'login';

  if (isLoggedIn && isLoginRoute) {
    router.navigate(['/main']);
    return false;
  }

  if (!isLoggedIn && !isLoginRoute) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
