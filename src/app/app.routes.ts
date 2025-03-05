import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { AuthGuard } from '../app/auth.guard';
import { NhanVienListComponent } from '../app/list-nhanvien/list-nhanvien.component';
import { NhanVienDetailComponent } from '../app/nhanvien-detail/nhanvien-detail.component';
import { NhanVienFormComponent } from '../app/nhanvien-form/nhanvien-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'nhan-vien', component: NhanVienListComponent, canActivate: [AuthGuard] },
  { path: 'nhan-vien/:id', component: NhanVienDetailComponent, canActivate: [AuthGuard] },
  { path: 'nhan-vien/create', component: NhanVienFormComponent, canActivate: [AuthGuard] },
  { path: 'nhan-vien/edit/:id', component: NhanVienFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];