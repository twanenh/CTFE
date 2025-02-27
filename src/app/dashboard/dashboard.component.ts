import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <div class="content">
        <p>Chào mừng đến với trang Dashboard. Bạn đã đăng nhập thành công!</p>
        <p>Đây là nội dung chỉ dành cho người dùng đã xác thực.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .content {
      background-color: #f9f9f9;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class DashboardComponent {}