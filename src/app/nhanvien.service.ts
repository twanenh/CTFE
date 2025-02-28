import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NhanVien {
  id: string;
  ten: string;
  tuoi: number;
  role: string;
  email: string;
  luong: number;
  trangThai: boolean;
}

export interface NhanVienDTO {
  ten: string;
  tuoi: number;
  role: string;
  email: string;
  luong: number;
  trangThai: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://tuananh.up.railway.app/api/NhanVien';

  constructor(private http: HttpClient) { }

  // Lấy danh sách nhân viên
  getEmployees(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.apiUrl, { withCredentials: true });
  }

  // Lấy nhân viên theo ID
  getEmployee(id: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Thêm nhân viên
  createEmployee(employee: NhanVienDTO): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.apiUrl, employee, { withCredentials: true });
  }

  // Cập nhật nhân viên
  updateEmployee(id: string, employee: NhanVienDTO): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${this.apiUrl}/${id}`, employee, { withCredentials: true });
  }

  // Xóa nhân viên
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
