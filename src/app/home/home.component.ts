import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  template: `
    <div class="home-container">
      <h1>Chào mừng đến với ứng dụng của chúng tôi</h1>
      
      <div class="content">
        <p>Đây là trang chủ của ứng dụng.</p>
        
        <div class="actions" *ngIf="!(isAuthenticated$ | async)">
          <a routerLink="/login" class="btn btn-primary">Đăng nhập</a>
          <a routerLink="/register" class="btn btn-secondary">Đăng ký tài khoản</a>
        </div>
        
        <div class="actions" *ngIf="isAuthenticated$ | async">
          <a routerLink="/dashboard" class="btn btn-primary">Vào Dashboard</a>
          <a routerLink="/profile" class="btn btn-secondary">Hồ sơ của tôi</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    
    h1 {
      margin-bottom: 2rem;
      color: #333;
    }
    
    .content {
      margin-top: 2rem;
    }
    
    .actions {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .btn-primary {
      background-color: #4d90fe;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #357ae8;
    }
    
    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
    }
    
    .btn-secondary:hover {
      background-color: #e5e5e5;
    }
  `]
})
export class HomeComponent {
  isAuthenticated$;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }
}