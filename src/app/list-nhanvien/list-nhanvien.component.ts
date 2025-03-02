import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NhanVien, NhanVienService } from '../nhanvien.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nhan-vien-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nhan-vien-list.component.html',
  styleUrls: ['./nhan-vien-list.component.css']
})
export class NhanVienListComponent implements OnInit {
  nhanViens: NhanVien[] = [];
  loading = false;
  error = '';

  constructor(
    private nhanVienService: NhanVienService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNhanViens();
  }

  loadNhanViens(): void {
    this.loading = true;
    this.error = '';
    
    this.nhanVienService.getAllNhanVien().subscribe({
      next: (data) => {
        this.nhanViens = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách nhân viên:', err);
        this.error = 'Không thể tải danh sách nhân viên. Vui lòng thử lại sau.';
        this.loading = false;
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