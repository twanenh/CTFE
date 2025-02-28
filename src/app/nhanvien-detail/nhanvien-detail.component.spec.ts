import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanvienDetailComponent } from './nhanvien-detail.component';

describe('NhanvienDetailComponent', () => {
  let component: NhanvienDetailComponent;
  let fixture: ComponentFixture<NhanvienDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NhanvienDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhanvienDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
