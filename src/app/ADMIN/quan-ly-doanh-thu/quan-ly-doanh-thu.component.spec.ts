import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDoanhThuComponent } from './quan-ly-doanh-thu.component';

describe('QuanLyDoanhThuComponent', () => {
  let component: QuanLyDoanhThuComponent;
  let fixture: ComponentFixture<QuanLyDoanhThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyDoanhThuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyDoanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
