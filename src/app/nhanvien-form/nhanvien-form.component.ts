import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVien, NhanVienDTO, NhanVienService } from '../nhanvien.service';

@Component({
  selector: 'app-nhan-vien-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nhan-vien-form.component.html',
  styleUrls: ['./nhan-vien-form.component.css']
})
export class NhanVienFormComponent implements OnInit {
  nhanVienForm!: FormGroup;
  isEditMode = false;
  nhanVienId = '';
  loading = false;
  submitting = false;
  error = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private nhanVienService: NhanVienService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Kiểm tra xem đang ở chế độ chỉnh sửa hay tạo mới
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode = true;
      this.nhanVienId = id;
      this.loadNhanVienData(id);
    }
  }

  initForm(): void {
    this.nhanVienForm = this.fb.group({
      ten: ['', [Validators.required]],
      tuoi: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      luong: ['', [Validators.required, Validators.min(0)]],
      trangThai: [true]
    });
  }

  loadNhanVienData(id: string): void {
    this.loading = true;
    
    this.nhanVienService.getNhanVienById(id).subscribe({
      next: (data) => {
        this.nhanVienForm.patchValue({
          ten: data.ten,
          tuoi: data.tuoi,
          role: data.role,
          email: data.email,
          luong: data.luong,
          trangThai: data.trangThai
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải thông tin nhân viên:', err);
        this.error = 'Không thể tải thông tin nhân viên. Vui lòng thử lại sau.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.nhanVienForm.invalid) {
      this.markFormGroupTouched(this.nhanVienForm);
      return;
    }

    this.submitting = true;
    this.error = '';
    this.successMessage = '';
    
    const nhanVienData: NhanVienDTO = this.nhanVienForm.value;

    if (this.isEditMode) {
      this.nhanVienService.updateNhanVien(this.nhanVienId, nhanVienData).subscribe({
        next: (data) => {
          this.successMessage = 'Cập nhật nhân viên thành công!';
          this.submitting = false;
          setTimeout(() => {
            this.router.navigate(['/nhan-vien']);
          }, 1500);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật nhân viên:', err);
          this.error = 'Không thể cập nhật thông tin nhân viên. Vui lòng thử lại sau.';
          this.submitting = false;
        }
      });
    } else {
      this.nhanVienService.createNhanVien(nhanVienData).subscribe({
        next: (data) => {
          this.successMessage = 'Thêm nhân viên mới thành công!';
          this.submitting = false;
          setTimeout(() => {
            this.router.navigate(['/nhan-vien']);
          }, 1500);
        },
        error: (err) => {
          console.error('Lỗi khi thêm nhân viên mới:', err);
          this.error = 'Không thể thêm nhân viên mới. Vui lòng thử lại sau.';
          this.submitting = false;
        }
      });
    }
  }

  // Hàm đánh dấu tất cả các trường là đã chạm vào để hiển thị lỗi validation
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  // Các getter để dễ dàng truy cập form controls trong template
  get tenControl() { return this.nhanVienForm.get('ten'); }
  get tuoiControl() { return this.nhanVienForm.get('tuoi'); }
  get roleControl() { return this.nhanVienForm.get('role'); }
  get emailControl() { return this.nhanVienForm.get('email'); }
  get luongControl() { return this.nhanVienForm.get('luong'); }
  get trangThaiControl() { return this.nhanVienForm.get('trangThai'); }

  cancel(): void {
    this.router.navigate(['/nhan-vien']);
  }
}