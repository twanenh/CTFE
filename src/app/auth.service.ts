import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://tuananh.up.railway.app/api/auth';
  // private baseUrl = 'https://localhost:7085/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password }, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    console.log(email, password),
    console.log(`${this.baseUrl}/login`)
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(false);
        })
      );
  }

  checkLoginStatus(): void {
    this.http.get<{ isAuthenticated: boolean }>(`${this.baseUrl}/check-login`, { withCredentials: true })
      .subscribe(response => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
      });
  }
}