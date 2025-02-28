import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class NhanVienService {
  private apiUrl = 'https://tuananh.up.railway.app/api/NhanVien';

  constructor(private http: HttpClient) { }

  // Lấy danh sách nhân viên
  getNhanViens(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.apiUrl, { withCredentials: true });
  }

  // Lấy thông tin một nhân viên
  getNhanVien(id: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Thêm nhân viên mới
  createNhanVien(nhanVien: NhanVienDTO): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.apiUrl, nhanVien, { withCredentials: true });
  }

  // Cập nhật thông tin nhân viên
  updateNhanVien(id: string, nhanVien: NhanVienDTO): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${this.apiUrl}/${id}`, nhanVien, { withCredentials: true });
  }

  // Xóa nhân viên
  deleteNhanVien(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}