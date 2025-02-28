// src/app/components/employee-list/employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService, NhanVien } from '../nhanvien.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: NhanVien[] = [];
  loading = true;
  error = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải danh sách nhân viên';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          this.error = 'Không thể xóa nhân viên';
          console.error(err);
        }
      });
    }
  }
}