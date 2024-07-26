import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      // Check if the user is authenticated
      if (user) {
        // Redirect authenticated users away from login and register pages
        if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register') {
          router.navigate(['/home']);
          return false;
        }
        // Allow navigation if already logged in
        return true;
      } else {
        // Redirect unauthenticated users to login page
        if (route.routeConfig?.path !== 'login' && route.routeConfig?.path !== 'register') {
          router.navigate(['/login']);
          return false;
        }
        // Allow navigation to login and register pages for unauthenticated users
        return true;
      }
    })
  );
};
