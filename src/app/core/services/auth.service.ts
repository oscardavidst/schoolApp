import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthLoginResponse, AuthStatus, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', user.jwToken);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/Account/authenticate`;
    const body = { email, password };

    return this.http.post<AuthLoginResponse>(url, body).pipe(
      map((resp) => this.setAuthentication(resp.data)),
      catchError((err) => {
        return throwError(() => err.error.Message);
      })
    );
  }

  register(email: string, password: string) {}

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    } else {
      this._authStatus.set(AuthStatus.authenticated);
      return of(true);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
