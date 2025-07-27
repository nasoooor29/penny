import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegistrationType, User } from '@penny/shared-validation';
import { env } from '@penny/shared-validation';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private toast: MessageService) {
    const user = localStorage.getItem('user');
    if (user) this.userSubject.next(JSON.parse(user));
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(
        `${env.apiBaseUrl}/api/auth/login`,
        { username, password },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((user) => {
          this.userSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }),
        catchError((error) => {
          this.toast.add({
            severity: 'error',
            summary: 'Login failed',
            detail: error.error?.message || 'Invalid credentials',
          });
          return throwError(() => error);
        })
      );
  }

  register(reg: RegistrationType) {
    return this.http
      .post<User>(`${env.apiBaseUrl}/api/auth/register`, reg)
      .pipe(
        tap((newUser) => {
          this.userSubject.next(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
        }),
        catchError((error) => {
          this.toast.add({
            severity: 'error',
            summary: 'Registration failed',
            detail: error.error?.message || 'Please try again',
          });
          return throwError(() => error);
        })
      );
  }

  logout() {
    return this.http
      .post(
        `${env.apiBaseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          console.log('User logged out');
          this.userSubject.next(null);
          this.toast.add({
            severity: 'success',
            summary: 'Logout successful',
            detail: 'You have been logged out.',
          });
          localStorage.removeItem('user');
        }),
        catchError((error) => {
          this.toast.add({
            severity: 'warn',
            summary: 'Logout failed',
            detail: error.error?.message || 'Try again later',
          });
          return throwError(() => error);
        })
      );
  }
  me() {
    return this.http
      .get<User>(`${env.apiBaseUrl}/api/auth/me`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          this.userSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }),
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('user');
          }
          // this.toast.add({
          //   severity: 'error',
          //   summary: 'Fetch user failed',
          //   detail: error.error?.message || 'Please try again',
          // });
          return throwError(() => error);
        })
      );
  }

  currentUser() {
    return this.userSubject.value;
  }
}
