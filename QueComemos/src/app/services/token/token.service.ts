import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_ID = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  public setAuth(auth: string): void {
    localStorage.removeItem(TOKEN_ID);
    localStorage.setItem(TOKEN_ID, auth);
  }

  public getAuth(): string {
    return localStorage.getItem('auth') ?? '';
  }

  public isLogged(): boolean {
    return this.getAuth() ? true : false;
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
