import { TestBed } from '@angular/core/testing';

import { NhanVienService } from './nhanvien.service';

describe('NhanvienService', () => {
  let service: NhanVienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanVienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
