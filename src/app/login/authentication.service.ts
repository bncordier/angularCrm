import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './model/user';

const USER_KEY = 'angular.crm.user';
const TOKEY_KEY = 'angular.crm.token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user?: User;
  private token?: string;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem(USER_KEY)) {
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
      this.token = sessionStorage.getItem(TOKEY_KEY)!;
    }
  }

  get isAuth(): boolean {
    return !!this.user;
  }

  get jwt(): string | undefined {
    return this.token;
  }

  disconnect(): void {
    this.user = undefined;
    this.token = undefined;
    sessionStorage.clear();
  }

  authUser(login: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/login', {
        email: login,
        password: password,
      })
      .pipe(
        map((response: AuthResponse) => {
          this.user = response.user;
          this.token = response.token;
          sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
          sessionStorage.setItem(TOKEY_KEY, this.token);
          return response.user;
        })
      );
  }
}

interface AuthResponse {
  user: User;
  token: string;
}
