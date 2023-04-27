import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  router: any;

  login() {
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn() {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn()) {
      return true;
    }

    // Si el usuario no está autenticado, guardar la URL intentada y redirigirlo al login
    localStorage.setItem('redirectUrl', url);
    this.router.navigate(['/login']);
    return false;
  }
}
