import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(email: string, password: string): Observable<any> {
    if (email === 'test@example.com' && password === 'password') {
      const mockUser = { id: 1, name: 'Test User', email };
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return of({ user: mockUser, token: mockToken });
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  register(name: string, email: string, password: string): Observable<any> {
    const mockUser = { id: 2, name, email };
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return of({ user: mockUser, token: mockToken });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  // private apiUrl = 'http://localhost:3000/auth'; // Adjust this based on your backend URL
  // private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // isLoggedIn$ = this.loggedIn.asObservable();

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post<{ token: string; name: string }>(`${this.apiUrl}/login`, credentials).pipe(
  //     tap(res => {
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('user', res.name);
  //       this.loggedIn.next(true);
  //     })
  //   );
  // }

  // register(data: { name: string; email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, data);
  // }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/login']);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // getUserName(): string | null {
  //   return localStorage.getItem('user');
  // }

  // private hasToken(): boolean {
  //   return !!localStorage.getItem('token');
  // }
}
