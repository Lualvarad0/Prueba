import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'loggedIn';

  constructor(private router: Router) {}

  login(): void {
    localStorage.setItem(this.KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }
}
