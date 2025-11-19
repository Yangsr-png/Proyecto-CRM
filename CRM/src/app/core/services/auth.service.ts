import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.isLoggedIn$.asObservable();

  constructor(private router: Router) {
  }

  public get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  login() {
    this.isLoggedIn$.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }
}