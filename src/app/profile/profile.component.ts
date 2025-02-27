import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="profile-container">
      <h1>Hồ sơ của tôi</h1>
      <div class="content">
        <p>Đây là trang hồ sơ người dùng.</p>
        <p>Nội dung trang hồ sơ sẽ được hiển thị ở đây.</p>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
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
export class ProfileComponent {}