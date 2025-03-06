import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NhanVien, NhanVienService } from '../nhanvien.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nhan-vien-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-nhanvien.component.html',
  styleUrls: ['./list-nhanvien.component.css']
})
export class NhanVienListComponent implements OnInit {
  nhanViens: NhanVien[] = [];
  loading = false;
  error = '';

  constructor(
    private nhanVienService: NhanVienService,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    // Kiểm tra xác thực trước khi load
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.loadNhanViens();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  loadNhanViens(): void {
    this.loading = true;
    this.error = '';
    
    // Thêm error handling chi tiết
    this.nhanVienService.getAllNhanVien().subscribe({
      next: (data) => {
        this.nhanViens = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Chi tiết lỗi:', err);
        this.error = err.message || 'Không thể tải danh sách nhân viên';
        this.loading = false;
        
        // Nếu lỗi xác thực, chuyển hướng về login
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/nhan-vien', id]);
  }

  editNhanVien(id: string): void {
    this.router.navigate(['/nhan-vien/edit', id]);
  }

  deleteNhanVien(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      this.nhanVienService.deleteNhanVien(id).subscribe({
        next: () => {
          this.loadNhanViens();
        },
        error: (err) => {
          console.error('Lỗi khi xóa nhân viên:', err);
          this.error = 'Không thể xóa nhân viên. Vui lòng thử lại sau.';
        }
      });
    }
  }

  createNewNhanVien(): void {
    this.router.navigate(['/nhan-vien/create']);
  }
}