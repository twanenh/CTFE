import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNhanvienComponent } from './list-nhanvien.component';

describe('ListNhanvienComponent', () => {
  let component: ListNhanvienComponent;
  let fixture: ComponentFixture<ListNhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNhanvienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
