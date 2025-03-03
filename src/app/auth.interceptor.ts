import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('auth_token');
  
  // Đảm bảo URL luôn sử dụng HTTPS
  let secureUrl = req.url;
  if (secureUrl.startsWith('http://')) {
    secureUrl = secureUrl.replace('http://', 'https://');
  }
  
  // Nếu có token, thêm vào header
  if (token) {
    const authReq = req.clone({
      url: secureUrl,
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  // Nếu không có token, vẫn đảm bảo URL dùng HTTPS
  const secureReq = req.clone({
    url: secureUrl
  });
  
  return next(secureReq);
};