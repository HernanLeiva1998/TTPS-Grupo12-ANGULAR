import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const ROLE_KEY = 'role';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private roleTypeSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    const storedRole = this.getRole();
    if (storedRole) {
      this.roleTypeSubject.next(storedRole);
    }
  }

  public setRole(roleType: string): void {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roleType));

    this.roleTypeSubject.next(roleType);
  }

  public getRole(): string {
    return JSON.parse(localStorage.getItem(ROLE_KEY)!) ?? '';
  }

  public getRole$(): Observable<string | null> {
    return this.roleTypeSubject.asObservable();
  }
}
