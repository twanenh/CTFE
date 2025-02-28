import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVien, NhanVienService } from '../nhanvien.service';

@Component({
  selector: 'app-nhan-vien-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nhan-vien-detail.component.html',
  styleUrls: ['./nhan-vien-detail.component.css']
})
export class NhanVienDetailComponent implements OnInit {
  nhanVien: NhanVien | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nhanVienService: NhanVienService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.nhanVienService.getNhanVienById(id).subscribe({
        next: (data) => {
          this.nhanVien = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Lỗi khi tải thông tin nhân viên:', err);
          this.error = 'Không thể tải thông tin nhân viên. Vui lòng thử lại sau.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Không tìm thấy ID nhân viên';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/nhan-vien']);
  }

  editNhanVien(id: string): void {
    this.router.navigate(['/nhan-vien/edit', id]);
  }

  deleteNhanVien(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      this.nhanVienService.deleteNhanVien(id).subscribe({
        next: () => {
          this.router.navigate(['/nhan-vien']);
        },
        error: (err) => {
          console.error('Lỗi khi xóa nhân viên:', err);
          this.error = 'Không thể xóa nhân viên. Vui lòng thử lại sau.';
        }
      });
    }
  }
}