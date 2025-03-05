import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Đảm bảo URL sử dụng HTTPS thay vì HTTP
  private baseUrl = 'https://tuananh.up.railway.app/api/auth';
  // private baseUrl = 'https://localhost:7085/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Kiểm tra xem người dùng đã đăng nhập chưa khi khởi tạo service
    this.checkLoginStatus();
    ///
    // Kiểm tra lại token khi người dùng trở lại tab sau khi đã rời đi
    window.addEventListener('focus', () => {
      this.checkLoginStatus();
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, password }, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          // Giả sử server trả về token
          if (response.token) {
            sessionStorage.setItem('auth_token', response.token);
          }
          this.isAuthenticatedSubject.next(true);
          sessionStorage.setItem('isLoggedIn', 'true');
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          sessionStorage.removeItem('auth_token');
          this.isAuthenticatedSubject.next(false);
          sessionStorage.removeItem('isLoggedIn');
        })
      );
  }

  checkLoginStatus(): void {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    // Nếu đã đăng nhập theo sessionStorage, giữ nguyên trạng thái
    if (isLoggedIn) {
      this.isAuthenticatedSubject.next(true);
      
      // Chỉ kiểm tra với server sau một khoảng thời gian nhất định
      if (this.shouldCheckServerStatus()) {
        this.verifyServerLoginStatus();
      }
    } else {
      // Nếu chưa đăng nhập mới gọi API
      this.verifyServerLoginStatus();
    }
  }
  
  private shouldCheckServerStatus(): boolean {
    const lastCheck = sessionStorage.getItem('lastLoginCheck');
    if (!lastCheck) return true;
    
    // Chỉ kiểm tra lại sau 30 phút
    const THIRTY_MINUTES = 30 * 60 * 1000;
    return Date.now() - parseInt(lastCheck) > THIRTY_MINUTES;
  }
  
  private verifyServerLoginStatus(): void {
    this.http.get<{ isAuthenticated: boolean }>(`${this.baseUrl}/check-login`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('lastLoginCheck', Date.now().toString());
          
          if (response.isAuthenticated) {
            this.isAuthenticatedSubject.next(true);
            sessionStorage.setItem('isLoggedIn', 'true');
          } else {
            this.isAuthenticatedSubject.next(false);
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('auth_token');
          }
        },
        error: (error) => {
          console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
          // Không tự động đăng xuất nếu kiểm tra thất bại
        }
      });
  }
}