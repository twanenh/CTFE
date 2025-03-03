import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Sửa baseUrl để sử dụng HTTPS thay vì HTTP
  private baseUrl = 'https://tuananh.up.railway.app/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasStoredAuthToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  // Phương thức kiểm tra token trong localStorage
  private hasStoredAuthToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Lưu token khi đăng nhập thành công
  private saveAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Xóa token khi đăng xuất
  private clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password }, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          // Lưu token nếu có trong response
          if (response && response.token) {
            this.saveAuthToken(response.token);
          }
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.clearAuthToken();
          this.isAuthenticatedSubject.next(false);
        })
      );
  }

  checkLoginStatus(): void {
    // Nếu đã có token trong localStorage, coi như đã đăng nhập
    if (this.hasStoredAuthToken()) {
      // Vẫn gọi API để xác nhận token hợp lệ
      this.http.get<{ isAuthenticated: boolean }>(`${this.baseUrl}/check-login`, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.isAuthenticatedSubject.next(response.isAuthenticated);
            if (!response.isAuthenticated) {
              // Nếu token không hợp lệ, xóa token
              this.clearAuthToken();
            }
          },
          error: () => {
            // Xử lý lỗi khi gọi API
            this.isAuthenticatedSubject.next(false);
            this.clearAuthToken();
          }
        });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }
}