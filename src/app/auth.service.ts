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
    const token = sessionStorage.getItem('auth_token');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (token && isLoggedIn === 'true') {
      // Chỉ kiểm tra với server nếu cần thiết
      if (this.shouldCheckServerStatus()) {
        this.verifyServerLoginStatus();
      } else {
        // Tin tưởng trạng thái đăng nhập hiện tại
        this.isAuthenticatedSubject.next(true);
      }
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }
  private shouldCheckServerStatus(): boolean {
    const lastCheck = sessionStorage.getItem('lastLoginCheck');
    if (!lastCheck) return true;
  
    // Chỉ kiểm tra lại sau 5 phút
    const FIVE_MINUTES = 5 * 60 * 1000;
    return Date.now() - parseInt(lastCheck) > FIVE_MINUTES;
  }

  private verifyServerLoginStatus(): void {
    sessionStorage.setItem('lastLoginCheck', Date.now().toString());
    
    this.http.get<{ isAuthenticated: boolean }>(
      `${this.baseUrl}/check-login`, 
      { 
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    ).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          this.isAuthenticatedSubject.next(true);
        } else {
          // Nếu server cho biết không được xác thực, thì đăng xuất
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('isLoggedIn');
          this.isAuthenticatedSubject.next(false);
        }
      },
      error: (err) => {
        console.error('Lỗi kiểm tra trạng thái đăng nhập:', err);
        // Không tự động đăng xuất khi có lỗi mạng
        // Giữ nguyên trạng thái đăng nhập hiện tại
      }
    });
  }
}