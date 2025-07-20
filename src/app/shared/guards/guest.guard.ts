import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/']);
    return false;
  }
}; 