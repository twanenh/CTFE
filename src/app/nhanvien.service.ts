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
export class NhanVienService {
  // Đảm bảo URL sử dụng HTTPS
  private baseUrl = 'https://tuananh.up.railway.app/api/NhanVien';

  constructor(private http: HttpClient) { }

  getAllNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.baseUrl, { withCredentials: true });
  }

  getNhanVienById(id: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  createNhanVien(nhanVien: NhanVienDTO): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.baseUrl, nhanVien, { withCredentials: true });
  }

  updateNhanVien(id: string, nhanVien: NhanVienDTO): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${this.baseUrl}/${id}`, nhanVien, { withCredentials: true });
  }

  deleteNhanVien(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}