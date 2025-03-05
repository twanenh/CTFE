import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Lấy token từ sessionStorage để đồng nhất với auth.service
  const token = sessionStorage.getItem('auth_token');
  
  // Đảm bảo URL luôn sử dụng HTTPS
  let secureUrl = req.url;
  if (secureUrl.startsWith('http://')) {
    secureUrl = secureUrl.replace('http://', 'https://');
  }
  
  // Nếu có token, thêm vào header
  if (token) {
    const authReq = req.clone({
      url: secureUrl,
      headers: req.headers.set('Authorization', `Bearer ${token}`),
      // Thêm withCredentials để đảm bảo gửi cookies
      setHeaders: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return next(authReq);
  }
  
  // Nếu không có token, vẫn đảm bảo URL dùng HTTPS và gửi credentials
  const secureReq = req.clone({
    url: secureUrl,
    withCredentials: true,
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });
  
  return next(secureReq);
};